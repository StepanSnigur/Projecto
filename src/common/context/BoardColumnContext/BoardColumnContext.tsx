import React, { useState, createContext } from 'react'

export interface IBoardColumnContext {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  anchorEl: React.RefObject<HTMLDivElement> | null,
  setAnchorEl: (el: React.RefObject<HTMLDivElement>) => void
}
export const BoardColumnContext = createContext<IBoardColumnContext>({
  isOpen: false,
  setIsOpen: () => {},
  anchorEl: null,
  setAnchorEl: () => {}
})
const BoardColumnContextProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<React.RefObject<HTMLDivElement> | null>(null)

  const contextState: IBoardColumnContext = {
    isOpen,
    setIsOpen,
    anchorEl,
    setAnchorEl
  }

  return (
    <BoardColumnContext.Provider value={contextState}>
      {children}
    </BoardColumnContext.Provider>
  )
}

export default BoardColumnContextProvider
