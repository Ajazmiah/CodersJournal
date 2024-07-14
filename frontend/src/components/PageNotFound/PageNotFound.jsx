import React from 'react'
import Styles from './PageNotFound.module.css'
import { useNavigate } from 'react-router-dom'

function NotFoundPage() {

  const navigate = useNavigate()
  return (
    <div className={Styles.pageNotFound}>
      <p>404-PAGE NOT FOUND</p>
      <button onClick={() => navigate(-2)}>Go Back</button>
     </div>
  )
}

export default NotFoundPage