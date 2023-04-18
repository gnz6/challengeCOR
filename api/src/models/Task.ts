import { Schema , model } from "mongoose";
import { Task } from '../interfaces/Task';

const TaskSchema = new Schema<Task>({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String
    },
    priority:[{
        type:String,
        enum:[ "high", "medium", "low" ],
        default:"high",
        required:true
    }],
    status:[{
        type:String,
        enum:["new", "in-process", "completed"],
        default:"new",
        required:true
    }]

})

const TaskModel = model("Task", TaskSchema)
export { TaskModel };