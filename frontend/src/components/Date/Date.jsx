import React from 'react'
import { formatDate } from '../../utils'

function Date({date}) {
  return  <span className='fontSize09em'>{formatDate(date)}</span>
}

export default Date