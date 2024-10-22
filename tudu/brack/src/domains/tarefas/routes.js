import { Router } from "express";
import { get,getById, post, put, deletar} from "./controller";

const router =  Router();

router.get("/", get)
router.get("/:id", getById);
router.post("/", post);
router.put("/:id", put);
router.delete("/:id", deletar);


export default router