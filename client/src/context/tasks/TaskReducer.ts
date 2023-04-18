import { Task } from "../../../../api/src/interfaces/Task";
import { tasksState } from "./TaskProvider";

type tasksType =
  | { type: "[Task] Add-Task"; payload: Task }
  | { type: "[Task] Update-Task"; payload: Task }
  | { type: "[Task] Initial-tasks"; payload: Task[] }
  | { type: "[Task] Delete-task"; payload: Task };

export const tasksReducer = (
  state: tasksState,
  action: tasksType
): tasksState => {
  switch (action.type) {
    case "[Task] Add-Task":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
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
      };
    case "[Task] Delete-task":
      return {
        ...state,
        tasks: state.tasks.filter((task) => {
          task._id !== action.payload._id;
        }),
      };

    default:
      return state;
  }
};
