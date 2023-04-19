import { Task } from "../../../../api/src/interfaces/Task";
import { tasksState } from "./TaskProvider";



type tasksType =
  | { type: "[Task] Add-Task"; payload: Task }
  | { type: "[Task] Update-Task"; payload: Task }
  | { type: "[Task] Initial-tasks"; payload: Task[] }
  | { type: "[Task] Delete-task"; payload: Task }
  | { type: "[Task] Filter-Status"; payload: string }
  | { type: "[Task] Filter-Priority"; payload: string }
  | { type: "[Task] Delete-Task"; payload: Object}

export const tasksReducer = (
  state: tasksState,
  action: tasksType
): tasksState => {
  switch (action.type) {
    case "[Task] Add-Task":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        allTasks: [...state.tasks, action.payload],
      };
    case "[Task] Update-Task":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task._id == action.payload._id) {
            task.status = action.payload.status;
            task.description = action.payload.description;
          }
          return task;
        }),
      };
    case "[Task] Initial-tasks":
      return {
        ...state,
        tasks: [...action.payload],
        allTasks: [...action.payload],
      };
    case "[Task] Delete-task":
      return {
        ...state,
        tasks: state.tasks.filter((task) => {
          task._id !== action.payload._id;
        }),
      };
      case "[Task] Filter-Priority":
        const allTasks = state.tasks;
        let taskPriority = action.payload === "" ? allTasks : allTasks.filter( t => t.priority === action.payload)
        return{
          ...state,
          tasks: taskPriority
        };

        case "[Task] Filter-Status":
      const tasks = state.tasks;
      let taskStatus = action.payload === "" ? tasks : tasks.filter( t => t.status === action.payload)
      return{
        ...state,
        tasks: taskStatus
      };
      case "[Task] Delete-Task":
        const tasksBeforeDelete = state.allTasks
        return{
          ...state,
          tasks: tasksBeforeDelete.filter(t => t._id != action.payload)
        }

    default:
      return state;
  }
};
