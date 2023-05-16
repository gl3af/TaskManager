import React, {useEffect, useRef, useState} from "react";
import useHttp from "../hooks/http.hook"
import Modal from "../components/Modal"
import RegisterForm from "../components/RegisterForm";
import {useNavigate} from "react-router-dom";

function Register() {
  const [modal, setModal] = useState(false)
  const refs = useRef<HTMLInputElement[]>([])
  const {request, message, clearError} = useHttp()
  const navigate = useNavigate()

  useEffect(() => {
    if (message !== '')
      setModal(prev => !prev)
    if (message === "Пользователь создан") {
      setTimeout(() => {
        setModal(false)
        navigate("/login")
      }, 500)
    }
  }, [message, navigate])

  const registerHandler = async () => {
    const username = refs?.current[0].value
    const password = refs?.current[1].value
    const surname = refs.current[2].value
    const name = refs.current[3].value
    const lastName = refs.current[4].value
    const phoneNumber = refs.current[5].value
    const email = refs.current[6].value
    const isManager = refs.current[7].checked

    await request('/api/register', 'POST', {
      username, password, surname, name, lastName, phoneNumber, email, isManager
    })
  }

  const modalHandler = () => {
    setModal(prev => !prev)
    clearError()
  }

  return (
    <>
      <h1 className="text-3xl text-white text-center my-4">Регистрация</h1>
      {modal && <Modal message={message} modalHandler={modalHandler}/>}
      <div className="w-full max-w-md mx-auto">
        <RegisterForm
          refs={refs}
          registerHandler={registerHandler}
        />
      </div>
    </>
  )
}

export default Register