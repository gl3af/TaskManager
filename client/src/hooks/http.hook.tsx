import axios from "axios";
import {useCallback, useState} from "react";

const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const request = useCallback(
    async (url: string, method: string, body: {}) => {
      axios.defaults.baseURL = 'http://localhost:5000'

      setLoading(true)
      try {
        const response = await axios({
          method: method,
          url: url,
          data: body
        })
        const data = await response.data
        setMessage(data.message)
        setLoading(false)
        return data
      } catch (e: any) {
        setMessage(e.response.data.message)
      }

    }, [])

  const clearError = useCallback(() => setMessage(''), [])

  return { loading, request, message, clearError }
}

export default useHttp