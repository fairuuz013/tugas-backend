import { Router } from "express";
import {
    createProfile,
    getMyProfile,
    updateProfile,
    deleteProfile
} from "../controller/profile.controller";
import { authenticate } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

const router = Router();

router.post("/create", authenticate, upload.single("profile_picture_url")  ,createProfile);
router.get("/me", authenticate, getMyProfile);
router.put("/update", authenticate, updateProfile);
router.delete("/delete", authenticate, deleteProfile);

export default router;
