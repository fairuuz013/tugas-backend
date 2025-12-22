import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import type { IProfileService } from "../services/profile.service";

export class ProfileController {
  constructor(private profileService: IProfileService) {}

  // GET MY PROFILE
  async me(req: Request, res: Response) {
    const userId = req.user!.id;

    const profile = await this.profileService.getMyProfile(
      userId
    );

    successResponse(res, "Profile ditemukan", profile);
  }

  // CREATE PROFILE
  async create(req: Request, res: Response) {
    const userId = req.user!.id;

    const profile = await this.profileService.create(
      userId,
      req.body
    );

    successResponse(
      res,
      "Profile berhasil dibuat",
      profile,
      null,
      201
    );
  }

  // UPDATE PROFILE
  async update(req: Request, res: Response) {
    const userId = req.user!.id;

    const profile = await this.profileService.update(
      userId,
      req.body
    );

    successResponse(res, "Profile berhasil diupdate", profile);
  }
}
