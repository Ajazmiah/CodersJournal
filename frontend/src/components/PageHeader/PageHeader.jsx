import React from 'react'
import Styles from './PageHeader.module.css'
import classnames from "classnames";

export default function PageHeader({title}) {
  return (
    <h1 className={classnames([Styles['header']], 'h1')}>{title}</h1>
  )
}