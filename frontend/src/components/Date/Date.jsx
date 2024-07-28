import React from 'react'
import { formatDate } from '../../utils'

function Date({date}) {
    const styles = {
        marginBlock: '.5em',
        display: 'block'
    }
  return  <span className='fontSize09em' style={styles}>{formatDate(date)}</span>
}

export default Date