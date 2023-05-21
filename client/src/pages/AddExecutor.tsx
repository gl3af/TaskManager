import React, {useEffect, useState} from 'react';
import Modal from "../components/Modal";
import {useNavigate, useParams} from "react-router-dom";
import useHttp from "../hooks/http.hook";

const AddExecutor = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {request, message, clearError} = useHttp()
  const [modal, setModal] = useState(false)
  const [options, setOptions] = useState<any>([])
  const [executorId, setExecutorId] = useState(-1)

  useEffect(() => {
    const fetchData = async () => {
      const workers = await request(`/api/tasks/${id}/get-team-workers`, 'GET', {})
      const options = workers.map((item: { id: number, surname: string, name: string }) => {
        return {id: item.id, name: [item.surname, item.name].join(' ')}
      })
      setOptions(options)
    }

    fetchData().catch(err => {
    })
  }, [request, id])

  useEffect(() => {
    if (message)
      setModal(prev => !prev)
  }, [message])

  const modalHandler = () => {
    setModal(prev => !prev)
    clearError()
  }

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name: string = e.target.selectedOptions[0].innerText
    const selected = options.filter((option: any) => option.name === name)[0]
    setExecutorId(selected.id)
  }

  const createHandler = async () => {
    await request(`/api/tasks/${id}/add-executor`, 'PUT', {
      executorId: executorId
    })
    navigate("./../")
  }

  return (
    <div>
      <div className="pt-20">
        {modal && <Modal message={message} modalHandler={modalHandler}/>}
        <h1 className="text-white text-3xl font-semibold text-center pt-2">
          Назначение исполнителя
        </h1>
        <div className="w-full max-w-2xl mx-auto py-4">
          <form className="bg-gray-700 shadow-md rounded-xl px-8 pt-12 pb-8 mt-2">
            <div className="flex flex-col justify-center items-center">
              <select
                name="workers_list"
                id="workers_list"
                className="w-1/2 border rounded-lg block p-2.5 bg-gray-700 border-gray-600
                placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500
                text-center text-md"
                onChange={selectHandler}
              >
                <option defaultValue={""}></option>
                {options.map((x: any) => <option key={x.id}>{x.name}</option>)}
              </select>
              <button
                className="bg-blue-500 hover:bg-blue-700 w-1/3 text-white font-bold py-2 px-4 rounded mx-auto mt-4"
                type="button"
                onClick={createHandler}
              >
                Добавить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default AddExecutor;