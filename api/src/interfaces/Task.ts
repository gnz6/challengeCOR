import {Types} from "mongoose";

export interface Task{
    name : string,
    description?: string,
    priority: [ "high", "medium", "low" ],
    status: ["new", "in-process", "completed"],
    _id?: Types.ObjectId
}
