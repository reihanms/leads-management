import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";
import { ValidationError } from "../utils/errors";

/**
 * Creates middleware that validates req.body against a Zod schema.
 * On failure, throws a ValidationError with field-level details.
 */
export const validate = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));
        next(new ValidationError("Validation failed", errors));
      } else {
        next(error);
      }
    }
  };
};

