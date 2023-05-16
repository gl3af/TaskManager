import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState<any>("token")
  const [ready, setReady] = useState(false)
  const [username, setUsername] = useState('')
  const [type, setType] = useState(-1)

  const login = useCallback((jwtToken: any, username: string, type: number) => {
    setToken(jwtToken)
    setUsername(username)
    setType(type)
    localStorage.setItem(storageName, JSON.stringify({
      username: username, token: jwtToken, type: type
    }))
  }, [])


  const logout = useCallback(() => {
    setToken(null)
    setUsername('')
    setType(-1)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName) || '{}')

    if (data && data.token) {
      login(data.token, data.username, data.type)
    }
    setReady(true)
  }, [login])


  return {login, logout, token, username, ready, type}
}