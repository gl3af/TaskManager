import CreateTeamForm from "../components/CreateTeamForm";
import React, {useContext, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import useHttp from "../hooks/http.hook";
import Modal from "../components/Modal";
import {UserContext} from "../context/UserContext";

function CreateTeam() {
  const refs = useRef<HTMLInputElement[]>([])
  const navigate = useNavigate()
  const {request, message, clearError} = useHttp()
  const [modal, setModal] = useState(false)
  const [options, setOptions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState<{id: number, name: string}[]>([])
  const auth = useContext(UserContext)

  useEffect(() => {
    if (message)
      setModal(prev => !prev)
  }, [message])

  useEffect(() => {
    const fetchData = async () => {
      const users = await request('/api/users/available', 'GET', {})
      const options = users.map((item: { id: number, surname: string, name: string }) => {
        return {id: item.id, name: [item.surname, item.name].join(' ')}
      })
      setOptions(options)
    }

    fetchData().catch(err => {})
  }, [request])

  const modalHandler = () => {
    setModal(prev => !prev)
    clearError()
  }

  const createHandler = async () => {
    const name = refs?.current[0].value
    const description = refs?.current[1].value
    await request('/api/teams/create', 'POST', {
      username: auth.username, name, description, selectedOptions
    })
    navigate("./../")
  }

  return (
    <div className="pt-20">
      { modal && <Modal message={message} modalHandler={modalHandler} /> }
      <h1 className="text-white text-3xl font-semibold text-center pt-2">
        Создание команды
      </h1>
      <div className="w-full max-w-2xl mx-auto py-4">
        <CreateTeamForm
          refs={refs}
          options={options}
          selectedOptions={selectedOptions}
          setOptions={setOptions}
          setSelectedOptions={setSelectedOptions}
          createHandler={createHandler}
        />
      </div>
    </div>
  )
}

export default CreateTeam