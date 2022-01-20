import { HttpException } from "../../exceptions/HttpException";
import { NextFunction, Request, Response } from "express";

export const httpExceptionFunction = (
  err: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (err instanceof HttpException) {
    return response.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode
    });
  }

  return response.status(500).json({
    message: err.message,
    statusCode: 500
  });
}
