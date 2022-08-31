
import { AppDispatch } from ".."
import axios from "../../axios"
import { IAirport, ServerResponse } from "../../models/models"
import {airportSlice} from "../slices/AirportSlice"

export const fetchAirports = (page = 1, count = 50) => {
return async (dispatch: AppDispatch) => {
  try {
    dispatch(airportSlice.actions.fetching())
    const response = await axios.get<ServerResponse<IAirport>>('airports', {
      params: {
      page, count
      }
    })
    dispatch(airportSlice.actions.fetchSuccess({
      airports: response.data.results,
      count: response.data.count
    }
    
    ))
    
  } catch (error) {
    dispatch(airportSlice.actions.fetchError(error as Error))
  }
}
}
  
