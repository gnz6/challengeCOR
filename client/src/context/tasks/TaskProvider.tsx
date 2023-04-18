import React, { useReducer } from "react";
import { TaskContext } from "./TaskContext";
import { Task } from '../../../../api/src/interfaces/Task';
import { tasksReducer } from "./TaskReducer";
import axios from "axios";


export interface tasksState{
    tasks: Task[]
}

interface Props{
    children?: React.ReactNode
}

type TaskStatus = "new"| "in-process"| "completed"
type TaskPriority = "high" | "medium"| "low"

const tasksInitialState : tasksState = {tasks : []}

export const TaskProvider = ({children} : Props) => {
    
    const [ state, dispatch ] = useReducer( tasksReducer , tasksInitialState )
    
    
    const addNewTask = async( name: string = "New Task", description?: string, status: TaskStatus= "new", priority: TaskPriority = "high" ) => {    
        const newTask = { name, description, status, priority};
        const {data} = await axios.post<Task>("http://localhost:3001/task", {newTask} );
        console.log(data)
        dispatch({ type:"[Task] Add-Task", payload: data})
    }

    const updateTask = async( task : Task)=> {
        const {_id} = task;
        const { data } = await axios.put<Task>(`http://localhost:3001/task/${_id}`, {task})
        console.log(data);
        dispatch({ type:"[Task] Update-Task", payload: data});
    };


    return(
        <TaskContext.Provider value={{...state, addTask: addNewTask, updateTask}}>
            {children}
        </TaskContext.Provider>
    )

}

