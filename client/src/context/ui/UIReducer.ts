import { UiState } from "./UIProvider";

type UIType =
  | { type: "UI - Is Adding"; payload: boolean }
  | { type: "UI - Start Dragging";  }
  | { type: "UI - End Dragging"; };

export const uiReducer = (state: UiState, action: UIType): UiState => {
  switch (action.type) {
   
    case "UI - Is Adding":
      return {
        ...state,
        isAddingEntry: action.payload,
      };
      case "UI - Start Dragging":
        return {
          ...state,
          isDragging: true,
        };

        case "UI - End Dragging":
      return {
        ...state,
        isDragging: false,
      };

    default:
      return state;
  }
};
