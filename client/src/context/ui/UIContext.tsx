
import { createContext } from 'react';

export interface UIContextProps{
    isAddingEntry : boolean,
    isDragging: boolean
    setIsAddingEntry : (isAdding : boolean) => void,
    startDragging : () => void
    endDragging : () => void

}


export const UIContext = createContext({} as UIContextProps)

