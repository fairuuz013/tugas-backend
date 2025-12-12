import { Router } from "express";
import { 
    getAll,
    getById,
    search,
    create,
    update,
    remove
} from "../controller/orderItem.controller";

const router = Router();

router.get("/", getAll);
router.get("/search", search);
router.get("/:id", getById);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;
