import { ErrorRequestHandler } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { AppError } from "../utils/appError";
import { ZodError } from "zod";
import { Response } from "express";
import { ErrorCodeEnum } from "../enums/error_code.enum";

const formatZodError = (res: Response, err: ZodError) => {
  const errors = err?.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation failed",
    errors: errors,
    errorCode: ErrorCodeEnum.VALIDATION_ERROR,
  });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  console.error(`Error occurred on PATH: ${req.path}`, err);
  if (err instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid JSON payload",
      error: err?.message || "Syntax error",
    });
  }
  if (err instanceof ZodError) {
    return formatZodError(res, err);
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.errorCode || "Application error",
    });
  }
  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: err?.message || "An unexpected error occurred",
  });
};
