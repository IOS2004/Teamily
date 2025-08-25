import { z } from "zod";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { NextFunction, Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { joinWorkspaceByInvite } from "../services/member.service";

export const joinWorkspaceController = asyncHandler(
  async (req: Request, res: Response) => {
    const inviteCode = z.string().parse(req.params.inviteCode);
    const userId = req.user?._id;
    const { workspaceId, role } = await joinWorkspaceByInvite(
      userId,
      inviteCode
    );
    return res.status(HTTPSTATUS.OK).json({
      message: "Joined workspace successfully",
      workspaceId,
      role,
    });
  }
);
