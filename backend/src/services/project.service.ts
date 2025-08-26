import mongoose from "mongoose";
import ProjectModel from "../models/project.model";
import TaskModel from "../models/task.model";
import { NotFoundException } from "../utils/appError";
import { workspaceIdSchema } from "../validation/workspace.validation";
import { TaskStatusEnum } from "../enums/task.enum";
import { projectIdSchema } from "../validation/project.validation";

export const createProjectService = async (
  userId: string,
  workspaceId: string,
  body: {
    emoji?: string;
    name: string;
    description?: string;
  }
) => {
  const project = new ProjectModel({
    ...(body.emoji && { emoji: body.emoji }),
    name: body.name,
    ...(body.description && { description: body.description }),
    workspace: workspaceId,
    createdBy: userId,
  });
  await project.save();
  return { project };
};

export const getProjectsInWorkspaceService = async (
  workspaceId: string,
  pageSize: number,
  pageNumber: number
) => {
  const totalCount = await ProjectModel.countDocuments({
    workspace: workspaceId,
  });
  const skip = (pageNumber - 1) * pageSize;
  const projects = await ProjectModel.find({ workspace: workspaceId })
    .skip(skip)
    .limit(pageSize)
    .populate("createdBy", "_id name profilePicture -password")
    .sort({ createdAt: -1 });
  const totalPages = Math.ceil(totalCount / pageSize);
  return { projects, totalCount, totalPages, skip };
};

export const getProjectByIdAndWorkspaceIdService = async (
  projectId: string,
  workspaceId: string
) => {
  const project = await ProjectModel.findOne({
    _id: projectId,
    workspace: workspaceId,
  }).select("emoji name _id description");
  if (!project) {
    throw new NotFoundException("Project not found");
  }
  return { project };
};

export const getProjectAnalyticsService = async (
  projectId: string,
  workspaceId: string
) => {
  const project = await ProjectModel.findById(projectId);
  if (!project || project.workspace.toString() !== workspaceId.toString()) {
    throw new NotFoundException("Project not found");
  }
  const currentDate = new Date();
  const taskAnalytics = await TaskModel.aggregate([
    {
      $match: {
        project: new mongoose.Types.ObjectId(projectId),
      },
    },
    {
      $facet: {
        totalTasks: [{ $count: "count" }],
        overdueTasks: [
          {
            $match: {
              dueDate: {
                $lt: currentDate,
              },
              status: {
                $ne: TaskStatusEnum.DONE,
              },
            },
          },
          {
            $count: "count",
          },
        ],
        completedTasks: [
          {
            $match: {
              status: {
                $eq: TaskStatusEnum.DONE,
              },
            },
          },
          {
            $count: "count",
          },
        ],
      },
    },
  ]);
  const _analytics = taskAnalytics[0];
  const analytics = {
    totalTasks: _analytics.totalTasks[0]?.count || 0,
    overdueTasks: _analytics.overdueTasks[0]?.count || 0,
    completedTasks: _analytics.completedTasks[0]?.count || 0,
  };
  return { analytics };
};

export const updateProjectService = async (
  projectId: string,
  workspaceId: string,
  updateData: {
    name?: string;
    description?: string;
    emoji?: string;
  }
) => {
  const { name, description, emoji } = updateData;
  const project = await ProjectModel.findById(projectId);
  if (!project || project.workspace.toString() !== workspaceId.toString()) {
    throw new NotFoundException("Project not found");
  }
  project.name = name || project.name;
  project.description = description || project.description;
  project.emoji = emoji || project.emoji;
  await project.save();
  return { project };
};

export const deleteProjectService = async (
  projectId: string,
  workspaceId: string
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const project = await ProjectModel.findById(projectId).session(session);

    if (!project || project.workspace.toString() !== workspaceId.toString()) {
      throw new NotFoundException("Project not found");
    }

    await TaskModel.deleteMany({
      project: projectId,
      workspace: workspaceId,
    }).session(session);

    await project.deleteOne({ session });
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
