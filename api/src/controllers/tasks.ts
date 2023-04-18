import { Request, Response } from "express";
import { TaskModel } from "../models/Task";
import { DeleteTaskRequest, UpdateTaskRequest } from "../interfaces/ReqExtension";

const getTaskById = async ({ params }: Request, res: Response) => {
  console.log("get")
  try {
    const { taskId } = params;
    if (!taskId)
      return res
        .status(400)
        .json({ ok: false, message: "Missing / invalid id" });

    const task = await TaskModel.findById(taskId);

    if (!task)
      return res.status(404).json({ ok: false, message: "Cant find task" });
    return res.status(200).json({ ok: true, data: task });
  } catch (error) {
    console.warn(error);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const allTasks = await TaskModel.find({});
    if (!allTasks)
      return res.status(404).json({ ok: false, message: "No tasks found" });
    return res.status(200).json({ ok: true, data: allTasks });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

const createTask = async ({ body }: Request, res: Response) => {
  try {
    const newTask = await TaskModel.create(body);
    if (!newTask)
      return res
        .status(400)
        .json({ ok: false, message: "Missing required information" });
    return res.status(201).json({ ok: true, data: newTask });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

const updateTask = async (
  { params, body }: UpdateTaskRequest,
  res: Response
) => {
  try {
    const { taskId } = params;
    const task = await TaskModel.findByIdAndUpdate(taskId, body, { new: true });
    if (!task)
      return res
        .status(400)
        .json({ ok: false, message: "Missing required information" });
    return res.status(200).json({ ok: true, data: task });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

const deleteTask = async ({ params }: Request, res: Response) => {
  try {
    const { taskId } = params;
    console.log(taskId)
    const task = await TaskModel.findByIdAndDelete(taskId);

    if (!task) return res.status(400).json({ ok: false, message: "Missing required information" });
    return res.status(200).json({ok:true, data: `task ${taskId} deleted`})
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

export { getTaskById, getAllTasks, createTask, updateTask, deleteTask };
