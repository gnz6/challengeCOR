import { useReducer } from "react"
import { UIContext } from "./UIContext"
import { uiReducer } from "./UIReducer"
import React from 'react';


export interface UiState{
    isAddingEntry : boolean,
    isDragging: boolean
}

interface Props {
    children? : React.ReactNode
}


const UiInitialState : UiState = {
    isAddingEntry : false,
    isDragging : false

}

export const UiProvider = ({children} : Props  ) => {


    const [state, dispatch] = useReducer (uiReducer , UiInitialState)



    const setIsAddingEntry = (isAdding : boolean) => {
        dispatch({type : "UI - Is Adding", payload: isAdding})
          
      }

      const startDragging = () => {
        dispatch({type :  "UI - Start Dragging"})
          
      }

      const endDragging = () => {
        dispatch({type : "UI - End Dragging"})
          
      }


    return (
        <UIContext.Provider value={{...state , setIsAddingEntry , startDragging, endDragging}}> 
            {children}
        </UIContext.Provider>
    )
}