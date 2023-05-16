import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../hooks/http.hook";
import Modal from "../components/Modal";
import CreateSubtaskForm from "../components/CreateSubtaskForm";

function CreateSubtask() {
  const { id } = useParams()
  const refs = useRef<HTMLInputElement[]>([])
  const navigate = useNavigate()
  const {request, message, clearError} = useHttp()
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (message)
      setModal(prev => !prev)
  }, [message])

  const modalHandler = () => {
    setModal(prev => !prev)
    clearError()
  }

  const createHandler = async () => {
    const name = refs?.current[0].value
    const description = refs?.current[1].value
    const deadline = refs?.current[2].value
    await request(`/api/tasks/${id}/subtasks/create`, 'POST', {
      name, description, deadline
    })
    navigate("./../../")
  }

  return (
    <div className="pt-20">
      { modal && <Modal message={message} modalHandler={modalHandler} /> }
      <h1 className="text-white text-3xl font-semibold text-center pt-2">
        Создание подзадачи
      </h1>
      <div className="w-full max-w-2xl mx-auto py-4">
        <CreateSubtaskForm
          refs={refs}
          createHandler={createHandler}
        />
      </div>
    </div>
  )
}

export default CreateSubtask