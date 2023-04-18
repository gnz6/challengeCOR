import { Router } from "express";
import { getTaskById, getAllTasks, createTask, updateTask, deleteTask } from "../controllers/tasks";
const router = Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:taskId", getTaskById);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export {router};