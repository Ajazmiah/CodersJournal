import React from 'react'
import { formatDate } from '../../utils'
import classNames from 'classnames'

function Date({date, ...rest}) {
    const styles = {
        marginBlock: '.5em',
        display: 'block'
    }
    const {classes} = {...rest}
  return  <span {...rest} className={classNames(classes, 'fontSize09em')} style={styles}>{formatDate(date)}</span>
}

export default Date