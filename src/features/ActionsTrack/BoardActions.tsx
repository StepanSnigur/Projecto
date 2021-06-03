import React from 'react'
import { useSelector } from 'react-redux'
import { getBoardActions } from '../../pages/BoardPage/selectors'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  boardActionsWrapper: {
    height: '300px'
  }
})

const BoardActions = () => {
  const actions = useSelector(getBoardActions)
  const PAGE_SIZE = 10
  const boardActionsGrid: GridColDef[] = [
    { field: 'producedAt', headerName: 'Дата', width: 110 },
    { field: 'producedBy', headerName: 'Исполнитель', width: 145 },
    { field: 'action', headerName: 'Действие', width: 660 }
  ]
  const styles = useStyles()

  return (
    <div className={styles.boardActionsWrapper}>
      <DataGrid
        rows={actions}
        columns={boardActionsGrid}
        pageSize={PAGE_SIZE}
        getRowId={row => row._id}
        disableSelectionOnClick
      />
    </div>
  )
}

export default BoardActions
