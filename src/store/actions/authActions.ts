import { AppDispatch } from ".."
import axios from "../../axios";
import {authSlice} from "../slices/authSlice";

interface AuthResponse {
  access: string
  refresh: string
}

interface AuthData {
  username: string
  password: string
}

export const register = (data: AuthData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<AuthResponse>(`auth/register`, data)
      dispatch(authSlice.actions.login({
        username: data.username,
        access: response.data.access
      }))
    } catch (error) {
      throw  error as Error

    }
  }
}

export const login = (data: AuthData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<AuthResponse>(`auth/login`, data)
      dispatch(authSlice.actions.login({
        username: data.username,
        access: response.data.access
      }))
    } catch (error) {
      console.log('error', error);

    }
  }
}