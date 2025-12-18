import { Router } from "express";
import { 

    getById,
    search,
    create,
    update,
    remove,
    getAllOrderItemsController
} from "../controller/orderItem.controller";

const router = Router();

router.get("/", getAllOrderItemsController);
router.get("/search", search);
router.get("/:id", getById);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;
