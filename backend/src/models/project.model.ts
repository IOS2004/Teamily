import mongoose, { Schema, Document } from "mongoose";

export interface ProjectDocument extends Document {
  name: string;
  description: string | null;
  workspace: mongoose.Types.ObjectId;
  emoji: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<ProjectDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    emoji: {
      type: String,
      required: false,
      trim: true,
      default: "📦",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectModel = mongoose.model<ProjectDocument>("Project", projectSchema);

export default ProjectModel;
