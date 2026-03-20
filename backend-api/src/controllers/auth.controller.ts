import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { asyncHandler } from "../utils/async-handler";

/**
 * Auth controller — thin layer that delegates to AuthService.
 */
export const authController = {
  /** POST /api/auth/register */
  register: asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.register(req.body);
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: user,
    });
  }),

  /** POST /api/auth/login */
  login: asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: result,
    });
  }),
};
