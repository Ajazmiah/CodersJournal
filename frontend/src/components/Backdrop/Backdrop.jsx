import React, {useContext} from 'react'
import styles from './Backdrop.module.css'
import ReactDom from 'react-dom'
import { modalContext } from '../../context/modalContext'

function Backdrop({children}) {


    const [isModalOpen, setOpenModal] = React.useContext(modalContext)

  return ReactDom.createPortal(
    <div className={styles.backdrop} onClick={() => setOpenModal(false)}>{children}</div>,
    document.getElementById('portal')
  )
 
}




export default Backdrop