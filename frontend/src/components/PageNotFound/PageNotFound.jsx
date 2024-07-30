import React from 'react'
import Styles from './PageNotFound.module.css'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';

function NotFoundPage() {

  const navigate = useNavigate()
  return (
    <div className={Styles.pageNotFound}>
      <p>404-PAGE NOT FOUND</p>
      <button className={Styles.goBack} onClick={() => navigate('/')}> <FaArrowLeft/> Go Back Home</button>
     </div>
  )
}

export default NotFoundPage