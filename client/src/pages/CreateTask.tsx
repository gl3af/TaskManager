import CreateTaskForm from "../components/CreateTaskForm";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../hooks/http.hook";
import Modal from "../components/Modal";

function CreateTask() {
  const { id } = useParams()
  const refs = useRef<HTMLInputElement[]>([])
  const navigate = useNavigate()
  const {request, message, clearError} = useHttp()
  const [modal, setModal] = useState(false)
  const [options, setOptions] = useState([])
  const [ICId, setICId] = useState(-1)

  useEffect(() => {
    const fetchData = async () => {
      const workers = await request(`/api/teams/${id}/workers`, 'GET', {})
      const options = workers.map((item: { id: number, surname: string, name: string }) => {
        return {id: item.id, name: [item.surname, item.name].join(' ')}
      })
      setOptions(options)
    }

    fetchData().catch(err => {})
  }, [request])

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
    await request(`/api/teams/${id}/tasks/create`, 'POST', {
      name, description, deadline, ICId
    })
    navigate("./../../")
  }

  return (
    <div className="pt-20">
      { modal && <Modal message={message} modalHandler={modalHandler} /> }
      <h1 className="text-white text-3xl font-semibold text-center pt-2">
        Создание поручения
      </h1>
      <div className="w-full max-w-2xl mx-auto py-4">
        <CreateTaskForm
          refs={refs}
          options={options}
          setICId={setICId}
          createHandler={createHandler}
        />
      </div>
    </div>
  )
}

export default CreateTask