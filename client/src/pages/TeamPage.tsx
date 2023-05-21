import AddNewButton from "../components/AddNewButton"
import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../context/UserContext"
import {useParams} from "react-router-dom"
import useHttp from "../hooks/http.hook"
import Loader from "../components/Loader"
import WorkerCard from "../components/WorkerCard"
import TaskCard from "../components/TaskCard";
import FieldSet from "../components/FieldSet";

function TeamPage() {
  const { id } = useParams()
  const { loading, request } = useHttp()
  const auth = useContext(UserContext)
  const [name, setName] = useState('Страница команды')
  const [description, setDescription] = useState('Какое-то описание')
  const [workers, setWorkers] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const team_id: number = id ? +id : -1
      const team = await request(`/api/teams/${team_id}`, 'GET', {})
      setName(team.name)
      setDescription(team.description)
      const workers = await request(`/api/teams/${team_id}/workers`, 'GET', {})
      setWorkers(workers)
      const tasks = await request(`/api/teams/${team_id}/tasks`, 'GET', {})
      setTasks(tasks)
    }

    fetchData().catch(err => {})

    return setWorkers([])
  }, [id, request])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="pt-20 bg-gray-700">
      <h1 className="text-center text-white text-3xl pb-3 font-semibold">
        Информация о команде '{name}'
      </h1>
      <div className="bg-gray-800 max-w-xl mx-auto rounded-xl border shadow-xl">
        {auth.type === 2 && <AddNewButton link="tasks/create"/>}
        <FieldSet text={name}>
          <p className="text-white px-4 pt-0 text-xl">{description}</p>
        </FieldSet>
        <FieldSet text={"Сотрудники"}>
          <div className="flex flex-col mx-auto">
            {workers !== null && workers.map((worker: any) =>
              <WorkerCard
                key={worker.id}
                surname={worker.surname}
                name={worker.name}
                lastname={worker.lastName}
                email={worker.email}
                phoneNumber={worker.phoneNumber}
              />
            )}
          </div>
        </FieldSet>
        {tasks !== null && <FieldSet text={"Поручения"}>
          <div className="flex flex-col max-w-6xl mx-auto">
            {tasks.map((task: any) =>
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
      </div>
    </div>
  )
}

export default TeamPage