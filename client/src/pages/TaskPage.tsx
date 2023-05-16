import AddNewButton from "../components/AddNewButton"
import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../context/UserContext"
import {useParams} from "react-router-dom"
import useHttp from "../hooks/http.hook"
import Loader from "../components/Loader"
import AddExecutorButton from "../components/AddExecutorButton";
import TaskCard from "../components/TaskCard";

function TaskPage() {
  const { id } = useParams()
  const { loading, request } = useHttp()
  const [name, setName] = useState('')
  const auth = useContext(UserContext)
  const [description, setDescription] = useState('')
  const [subtasks, setSubtasks] = useState<any[]>([])
  const [isIC, setIsIC] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const task_id: number = id ? +id : -1
      const task = await request(`/api/tasks/${task_id}`, 'GET', {})
      setName(task.name)
      setDescription(task.description)
      const IC = await request(`/api/users/${task.IC}`, 'GET', {})
      setIsIC(auth.username === IC.username)
      const subtasks = await request(`/api/tasks/${task_id}/subtasks`, 'GET', {})
      setSubtasks(subtasks)
    }

    fetchData().catch(err => {
    })

    return setSubtasks([])
  }, [id, request])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="pt-20 bg-gray-600">
      {isIC && <AddNewButton link="subtasks/create"/>}
      {(isIC && subtasks.length === 0) && <AddExecutorButton link="add-executor"/>}
      <h1 className="text-center text-white font-semibold pt-2 text-3xl">{name}</h1>
      <p className="text-center text-white pt-2 text-xl max-w-md mx-auto">{description}</p>
      <h1 className="text-center text-white font-semibold pt-2 text-2xl">Подпоручения</h1>
      <div className="flex flex-col max-w-6xl mx-auto">
        {subtasks.map((task: any) =>
          <TaskCard
            key={task.id}
            id={task.id}
            name={task.name}
            deadline={new Date(task.deadline)}
          />
        )}
      </div>
    </div>
  )
}

export default TaskPage