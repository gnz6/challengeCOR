import { createContext } from 'react';
import { Task } from '../../../../api/src/interfaces/Task';

export interface ContextProps{
    tasks: Task[]
    addTask : (description : string) => void;
    updateTask : (task : Task) => void;
}


export const TaskContext = createContext({} as ContextProps)