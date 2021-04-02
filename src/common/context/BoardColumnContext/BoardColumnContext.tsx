import React, { useState, createContext } from 'react'

export interface IBoardColumnContext {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  anchorEl: React.RefObject<HTMLDivElement> | null,
  setAnchorEl: (el: React.RefObject<HTMLDivElement>) => void,
  currentListId: string | null,
  setCurrentListId: (id: string) => void,
  isUpdating: boolean,
  setIsUpdating: (isUpdating: boolean) => void
}
export const BoardColumnContext = createContext<IBoardColumnContext>({
  isOpen: false,
  setIsOpen: () => {},
  anchorEl: null,
  setAnchorEl: () => {},
  currentListId: null,
  setCurrentListId: () => {},
  isUpdating: false,
  setIsUpdating: () => {}
})
const BoardColumnContextProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<React.RefObject<HTMLDivElement> | null>(null)
  const [currentListId, setCurrentListId] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const contextState: IBoardColumnContext = {
    isOpen,
    setIsOpen,
    anchorEl,
    setAnchorEl,
    currentListId,
    setCurrentListId,
    isUpdating,
    setIsUpdating
  }

  return (
    <BoardColumnContext.Provider value={contextState}>
      {children}
    </BoardColumnContext.Provider>
  )
}

export default BoardColumnContextProvider
