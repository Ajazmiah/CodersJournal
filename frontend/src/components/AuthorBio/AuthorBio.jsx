import React from 'react'
import Styles from './AuthorBio.module.css'
function AuthorBio({authorInfo}) {
    const {firstName , lastName} = authorInfo
    const fullName = `${firstName} ${lastName}`
  return (
    <div className={Styles.AuthorBio}>
        <div className={Styles.authorImage}> <img src={authorInfo.profilePicture} alt=""/></div>

        <div className={Styles.authorInfo}>
            <p>{fullName}</p>
            <p>SOMETHING ABOUT THE AUTHOR</p>
        </div>
    </div>
  )
}

export default AuthorBio