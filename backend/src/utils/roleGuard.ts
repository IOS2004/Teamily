import { PermissionType, RoleType } from "../enums/role.enum";
import { UnauthorizedException } from "./appError";
import { RolePermissions } from "./role-permission";

export const roleGuard = (
  role: RoleType,
  requiredPermissions: PermissionType[]
) => {
  const permissions = RolePermissions[role];
  const hasPermission = requiredPermissions.every((perm) =>
    permissions.includes(perm)
  );
  if (!hasPermission) {
    throw new UnauthorizedException(
      "You do not have permission to perform this action"
    );
  }
};
