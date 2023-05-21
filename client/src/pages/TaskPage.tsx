import AddNewButton from "../components/AddNewButton"
import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../context/UserContext"
import {Link, useParams} from "react-router-dom"
import useHttp from "../hooks/http.hook"
import Loader from "../components/Loader"
import AddExecutorButton from "../components/AddExecutorButton";
import TaskCard from "../components/TaskCard";
import FieldSet from "../components/FieldSet";

function TaskPage() {
  const {id} = useParams()
  const {loading, request} = useHttp()
  const auth = useContext(UserContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [subtasks, setSubtasks] = useState<any[]>([])
  const [IC, setIC] = useState<any>()
  const [executor, setExecutor] = useState<any>()

  useEffect(() => {
    const fetchData = async () => {
      const task_id: number = id ? +id : -1
      const task = await request(`/api/tasks/${task_id}`, 'GET', {})
      setName(task.name)
      setDescription(task.description)
      setStatus(task.status)
      const IC = await request(`/api/users/${task.IC}`, 'GET', {})
      setIC(IC)
      if (task.executor) {
        const executor = await request(`/api/users/${task.executor}`, 'GET', {})
        setExecutor(executor)
      }
      const subtasks = await request(`/api/tasks/${task_id}/subtasks`, 'GET', {})
      setSubtasks(subtasks)
    }

    fetchData().catch(err => {
    })

    return setSubtasks([])
  }, [request, id, auth.username])

  if (loading) {
    return <Loader/>
  }

  const isIC = IC?.username === auth?.username
  const isExecutor = executor?.username === auth?.username
  const buttonStyle = "text-white text-center border-green-500 py-2 px-4 rounded-md shadow-md bg-green-500 my-3"

  const accept = async () => {
    const task_id: number = id ? +id : -1
    window.location.reload()
    await request(`/api/tasks/${task_id}/accept`, 'PUT', {})
  }

  const finish = async () => {
    const task_id: number = id ? +id : -1
    window.location.reload()
    await request(`/api/tasks/${task_id}/accept`, 'PUT', {})
  }

  return (
    <div className="pt-20 bg-gray-700">
      <h1 className="text-center text-white text-3xl pb-3 font-semibold">
        Поручение
      </h1>
      {isIC && !executor && <AddNewButton link="subtasks/create"/>}
      {(isIC && subtasks.length === 0 && !executor) && <AddExecutorButton link="add-executor"/>}

      <div className="bg-gray-800 max-w-xl mx-auto border rounded-xl shadow-xl">
        <FieldSet text={name}>
          <p className="text-white px-4 text-xl">{description}</p>
        </FieldSet>
        <FieldSet text="Сотрудники">
          {IC && <p className="text-white px-4 text-xl">
            Ответственный: {[IC.surname, IC.name, IC.lastName].join(" ")}
          </p>}
          {executor && <p className="text-white px-4 text-xl">
            Исполнитель: {[executor.surname, executor.name, executor.lastName].join(" ")}
          </p>}
        </FieldSet>
        {subtasks.length !== 0 && <FieldSet text={"Подпоручения"}>
          <div className="flex flex-col max-w-6xl mx-auto">
            {subtasks.map((task: any) =>
              <TaskCard
                key={task.id}
                id={task.id}
                name={task.name}
                deadline={new Date(task.deadline)}
                status={task.status}
              />
            )}
          </div>
        </FieldSet>}
        <div className="flex justify-center">
          {isExecutor && status === 'Передано исполнителю' &&
            <button
              className={buttonStyle}
              onClick={accept}
            >Принять задачу</button>}
          {isExecutor && status === 'Принято к исполнению' &&
            <Link
              to={"./cards/create"}
              className={buttonStyle}
              onClick={finish}
            >Завершить задачу</Link>}
        </div>
      </div>
    </div>
  )
}

export default TaskPage