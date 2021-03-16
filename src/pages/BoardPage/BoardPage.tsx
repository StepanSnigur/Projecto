import React from 'react'

interface IBoardPage {
  boardId: string
}

const BoardPage: React.FC<IBoardPage> = ({ boardId }) => {
  return (
    <div>
      board, {boardId}
    </div>
  )
}

export default BoardPage
