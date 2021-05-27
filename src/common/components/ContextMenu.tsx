import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  wrapper: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },
  menu: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    padding: '6px',
    borderRadius: '5px'
  },
  menuButton: {
    width: '200px',
    height: '40px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '4px',
    textAlign: 'initial',
    padding: '0 15px',
    color: 'rgba(17, 24, 39)',

    '&:hover': {
      background: '#afbcc5',
      transition: '.3s'
    }
  }
})

export interface IContextMenu {
  x: null | number,
  y: null | number,
  onClose: () => void,
  children?: JSX.Element[]
}

const ContextMenu: React.FC<IContextMenu> = ({ children, x, y, onClose }) => {
  const styles = useStyles()

  const addClassToChildren = (child: React.ReactElement) => {
    return React.cloneElement(child, {
      className: `${child.props.className?.join(' ') || ''} ${styles.menuButton}`
    })
  }

  if (!x || !y || !children) return null

  return (
    <div className={styles.wrapper} onClick={onClose}>
      <div
        className={styles.menu}
        style={{
          left: x,
          top: y
        }}
      >
        {React.Children.map(children, addClassToChildren)}
      </div>
    </div>
  )
}

export default ContextMenu
