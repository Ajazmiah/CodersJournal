import React, {useContext} from 'react'
import styles from './Backdrop.module.css'
import ReactDom from 'react-dom'
import { backdropContext } from '../../context/backdropContext'

function Backdrop({children, handleShow}) {


  

  return ReactDom.createPortal(
    <div className={styles.backdrop} onClick={handleShow}>{children}</div>,
    document.getElementById('portal')
  )
 
}




export default Backdrop