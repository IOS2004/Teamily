import mongoose from "mongoose";
import UserModel from "../models/user.model";
import AccountModel from "../models/account.model";
import WorkspaceModel from "../models/worskspace.model";
import RoleModel from "../models/roles-permission.model";
import MemberModel from "../models/member.model";
import { Roles } from "../enums/role.enum";
import { NotFoundException } from "../utils/appError";

export const loginOrCreateAccountService = async (data: {
  provider: string;
  providerId: string;
  displayName: string;
  picture?: string;
  email?: string;
}) => {
  const { provider, providerId, displayName, picture, email } = data;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    console.log("Starting transaction for login or create account...");
    let user = await UserModel.findOne({ email }).session(session);
    if (!user) {
      user = new UserModel({
        email,
        name: displayName,
        profilePicture: picture || null,
      });
      await user.save({ session });
      const account = new AccountModel({
        userId: user._id,
        provider: provider,
        providerId: providerId,
      });
      await account.save({ session });
      const workspace = new WorkspaceModel({
        name: `My Workspace`,
        discription: `Workspace for ${user.name}`,
        owner: user._id,
      });
      await workspace.save({ session });
      const ownerRole = await RoleModel.findOne({ name: Roles.OWNER }).session(
        session
      );
      if (!ownerRole) {
        throw new NotFoundException("Owner role not found");
      }
      const member = new MemberModel({
        userId: user._id,
        workspaceId: workspace._id,
        role: ownerRole._id,
        joinedAt: new Date(),
      });
      await member.save({ session });
      user.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
      await user.save({ session });
    }
    await session.commitTransaction();
    session.endSession();
    console.log("Transaction committed successfully.");
    return { user };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error during login or create account:", error);
    throw error;
  } finally {
    session.endSession();
  }
};
