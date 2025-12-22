import type { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import type { IAuthService } from "../services/auth.service";

export class AuthController {
  constructor(private authService: IAuthService) {}

  register = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.register(req.body);
      successResponse(res, "Register berhasil", result, null, 201);
    } catch (err: any) {
      errorResponse(res, err.message);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const result = await this.authService.login(req.body);
      successResponse(res, "Login berhasil", result);
    } catch (err: any) {
      errorResponse(res, err.message);
    }
  };
}
