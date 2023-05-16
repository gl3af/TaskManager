import {createContext} from 'react'

interface IUserContext {
  token: any
  logged: boolean
  username: string
  type: number
  login: (token: string, username: string, type: number) => void
  logout: () => void
}

export const UserContext = createContext<IUserContext>({
  token: null,
  logged: false,
  username: '',
  type: -1,
  login: () => {},
  logout: () => {},
})