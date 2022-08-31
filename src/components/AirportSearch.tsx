import React from 'react'
import { useInput } from '../hook/input'

export  function AirportSearch() {
  const input = useInput('')
  
  return (
    <div className='mb-4 relative'>
      <input {...input} type='text' className='border py-2 px-4 w-full h-[42px] outline-0' placeholder='Type something here...'></input>
  {/* <div className='absolute left-0 right-0 h-[200px] top-[42px] shadow-md'>

  </div> */}
    </div>
  )
}
