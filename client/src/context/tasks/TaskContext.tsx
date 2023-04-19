import { createContext } from 'react';
import { Task } from '../../../../api/src/interfaces/Task';
import { Types } from 'mongoose';
import { UpdateTask } from './TaskProvider';

export interface ContextProps{
    tasks: Task[]
    addTask : ( task : Task ) => void;
    updateTask : (task : Task, {name, description, status, priority} : UpdateTask) => void;
    getAllTasks:()=> void;
    filterByStatus:(status:string)=> void
    filterByPriority:(priority:string)=> void
    deleteTask:(id: Types.ObjectId) => void
}


export const TaskContext = createContext({} as ContextProps)