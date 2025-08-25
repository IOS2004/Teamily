import { ErrorCodeEnum } from "../enums/error_code.enum";
import MemberModel from "../models/member.model";
import RoleModel from "../models/roles-permission.model";
import WorkspaceModel from "../models/worskspace.model";
import { NotFoundException, UnauthorizedException } from "../utils/appError";

export const getMemberRoleInWorkspace = async (
  userId: string,
  workspaceId: string
) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }
  const member = await MemberModel.findOne({ userId, workspaceId }).populate(
    "role"
  );
  if (!member) {
    throw new UnauthorizedException(
      "User is not a member of the workspace",
      ErrorCodeEnum.ACCESS_UNAUTHORIZED
    );
  }
  const roleName = member.role?.name;
  return { role: roleName };
};

export const getWorkspaceMembersService = async (workspaceId: string) => {
  const members = await MemberModel.find({
    workspaceId,
  })
    .populate("userId", "name email profilePicture -password")
    .populate("role", "name");
  const roles = await RoleModel.find({}, { name: 1, _id: 1 })
    .select("-permission")
    .lean();
  return { members, roles };
};
