import React, { useReducer } from "react";
import { TaskContext } from "./TaskContext";
import { Task } from '../../../../api/src/interfaces/Task';
import { tasksReducer } from "./TaskReducer";
import axios from "axios";
import { Types } from "mongoose";


export interface tasksState{
    tasks: Task[],
    allTasks: Task[]
}

interface Props{
    children?: React.ReactNode
}

export interface UpdateTask{
    name:string,
    description?:string
    status: string
    priority: string
}


const tasksInitialState : tasksState = {tasks : [], allTasks:[]}

export const TaskProvider = ({children} : Props) => {
    
    const [ state, dispatch ] = useReducer( tasksReducer , tasksInitialState )
    
    
    // const addNewTask = async( {name: string = "New Task", description?: string, status: string= "new", priority: string = "high"}:Task ) => {    
        const addNewTask = async( task:Task ) => {

        const  { name, description, status ="new", priority="high"} = task;
        const newTask = { name, description, status, priority}
        const {data} = await axios.post<Task>("http://localhost:3001/task", newTask );
        dispatch({ type:"[Task] Add-Task", payload: data})
    }

    const updateTask = async( task : Task, {name , description, status, priority}:UpdateTask)=> {
        const {_id} = task;
        const newTask = {name, description, status, priority}
        const { data } = await axios.put<Task>(`http://localhost:3001/task/${_id}`, newTask)
        console.log(data);
        dispatch({ type:"[Task] Update-Task", payload: data});
    };

    const getAllTasks = async()=>{
        const {data} = await axios.get("http://localhost:3001/task")
        dispatch({type:"[Task] Initial-tasks", payload:data.data})
        
    }

    const filterByStatus = (status:string)=> {
        dispatch({type:"[Task] Filter-Status", payload:status})
    }

    const filterByPriority = (priority:string)=> {
        dispatch({type:"[Task] Filter-Priority", payload:priority})
    }

    const deleteTask = async(id:Types.ObjectId)=> {
        const { data } = await axios.delete(`http://localhost:3001/task/${id}`)
        console.log(data)


    }

    return(
        <TaskContext.Provider value={{...state, addTask: addNewTask, updateTask, getAllTasks, filterByPriority, filterByStatus, deleteTask}}>
            {children} 
        </TaskContext.Provider>
    )

}

