import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Loading = () => {
  return (
    <div style={{ color: "black", display: 'flex', justifyContent: "center" , height:"100%", alignItems:"center"}}>
      <FontAwesomeIcon className='spinner' style={{ width: "100px"}} icon={faSpinner} />
    </div>
  )
}

export default Loading

