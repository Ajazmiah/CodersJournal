import React from 'react'
import Styles from './Border.module.css'
import classNames from 'classnames'

function Border({borderLocation='bottom'}) {
  return (
    <div className={classNames(Styles.border, Styles[borderLocation])}></div>
  )
}

export default Border