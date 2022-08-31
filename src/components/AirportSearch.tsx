import { ServerResponse } from '../models/models'
import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { useDebounce } from '../hook/debounce'
import { useInput } from '../hook/input'
import { IAirport } from '../models/models'
import { useNavigate } from 'react-router-dom'

export  function AirportSearch() {
  const [dropdown, setDropdown] = useState(false)
  const navigate = useNavigate()
  const input = useInput('')
  const [airports, setAirports] = useState<IAirport[]>([])
  const debounced = useDebounce<string>(input.value)

async function searchAirports() {
 const response = await axios.get<ServerResponse<IAirport>>(`airports`, {params: {search: debounced, count: 10}})
setAirports(response.data.results)
 
}

  useEffect(() => {
   if (debounced.length > 3) {
    searchAirports().then(() => setDropdown(true))
   } else {
    setDropdown(false)
   }
    
    
    
  }, [debounced])
  
  
  return (
    <div className='mb-4 relative'>
      <input {...input} type='text' className='border py-2 px-4 w-full h-[42px] outline-0' placeholder='Type something here...'></input>
{ dropdown && <ul className='list-none absolute left-0 right-0 h-[200px] top-[42px] shadow-md bg-white overflow-y-scroll'>
    {
      airports.map(airport => (
        <li 
        onClick={() => navigate(`/airport/${airport.id}`)}
        key={airport.id}
        className='py-2 px-4 mb-2 hover:bg-gray-500 hover:transition-colors cursor-pointer hover:text-white'
        > {airport.name}</li>
      ))
    }
  </ul>}
    </div>
  )
}
