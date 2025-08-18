import mongoose, { Schema, Document } from "mongoose";
import {
  TaskPriorityEnum,
  TaskPriorityEnumType,
  TaskStatusEnum,
  TaskStatusEnumType,
} from "../enums/task.enum";
import { generateTaskCode } from "../utils/uuid";

export interface TaskDocument extends Document {
  title: string;
  taskCode: string;
  description: string | null;
  project: mongoose.Types.ObjectId;
  workspace: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId | null;
  createdBy: mongoose.Types.ObjectId;
  dueDate: Date | null;
  status: TaskStatusEnumType;
  priority: TaskPriorityEnumType;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    taskCode: {
      type: String,
      required: true,
      unique: true,
      default: generateTaskCode,
    },
    description: {
      type: String,
      trim: true,
      default: null,
      required: false,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatusEnum),
      default: TaskStatusEnum.TODO,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriorityEnum),
      default: TaskPriorityEnum.MEDIUM,
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model<TaskDocument>("Task", taskSchema);

export default TaskModel;
