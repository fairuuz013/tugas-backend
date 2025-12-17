import type { Request, Response, NextFunction } from "express";
import * as profileService from "../services/profile.service";

export const createProfile = async (
    req: Request,
    res: Response,
) => {
    const { gender, address, name } = req.body
    const userId = req.user!.id;
    const file = req.file
    if (!file) {
        throw new Error(" image is required")
    }
    const imageUrl = `/public/uploads/${file.filename}`;
    const data = { gender: gender, address: address, name: name, profile_picture_url: imageUrl }


    const profile = await profileService.createProfile(userId, data);

    res.status(201).json({
        message: "Profile berhasil dibuat",
        data: profile
    });
}




export const updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!.id;

        const profile = await profileService.updateProfile(userId, req.body);

        res.status(200).json({
            message: "Profile berhasil diupdate",
            data: profile
        });
    } catch (error) {
        next(error);
    }
};


export const getMyProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!.id;

        const profile = await profileService.getProfileByUserid(userId);

        res.status(200).json({
            data: profile
        });
    } catch (error) {
        next(error);
    }
};


export const deleteProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user!.id;

        await profileService.deleteProfile(userId);

        res.status(200).json({
            message: "Profile berhasil dihapus"
        });
    } catch (error) {
        next(error);
    }
};
