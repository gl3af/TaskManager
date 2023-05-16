import React, {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../context/UserContext";
import useHttp from "../hooks/http.hook"
import Modal from "../components/Modal"
import LoginForm from "../components/LoginForm";
import {redirect} from "react-router-dom";

function Login() {
  const [modal, setModal] = useState(false)
  const refs = useRef<HTMLInputElement[]>([])
  const auth = useContext(UserContext)
  const {request, message, clearError} = useHttp()

  useEffect(() => {
    if (message !== '')
      setModal(prev => !prev)
  }, [message])

  useEffect(() => {
    redirect("/")
  }, [auth.logged])

  const loginHandler = async () => {
    const username = refs.current[0].value
    const password = refs.current[1].value

    const data = await request('/api/login', 'POST', { username, password })
    auth.login(data.token, data.username, data.type)
  }

  const modalHandler = () => {
    setModal(prev => !prev)
    clearError()
  }

  return (
    <>
      {modal && <Modal message={message} modalHandler={modalHandler}/>}
      <div className="w-full max-w-md mx-auto py-10">
        <LoginForm
          refs={refs}
          loginHandler={loginHandler}
        />
      </div>
    </>
  )
}

export default Login