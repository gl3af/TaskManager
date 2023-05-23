import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../context/UserContext";
import FieldSet from "../components/FieldSet";
import useHttp from "../hooks/http.hook";
import Loader from "../components/Loader";
import TaskCard from "../components/TaskCard";

function Home() {
  const auth = useContext(UserContext)
  const [managerTasks, setManagerTasks] = useState<any[]>([])
  const [ICTasks, setICTasks] = useState<any[]>([])
  const [executorTasks, setExecutorTasks] = useState<any[]>([])
  const {loading, request} = useHttp()



  useEffect(() => {
    const fetch = async () => {
      if (auth.username !== '') {
        const data = await request(`api/tasks/users/${auth.username}`, 'GET', {})
        if (auth.type === 2) {
          setManagerTasks(data.sort((a: any, b: any) => {
            let keyA = new Date(a.deadline), keyB = new Date(b.deadline);
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
          }))
        } else {
          setICTasks(data[0].sort((a: any, b: any) => {
            let keyA = new Date(a.deadline), keyB = new Date(b.deadline);
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
          }))
          setExecutorTasks(data[1].sort((a: any, b: any) => {
            let keyA = new Date(a.deadline), keyB = new Date(b.deadline);
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
          }))
        }
      }
    }
    fetch().catch(err => {})
  }, [auth.username])

  if (loading) return <Loader/>

  return (
    <main className="pt-20">
      <h2 className="text-center text-white font-semibold py-3 text-3xl">Мои задачи</h2>
      <div className="bg-gray-800 max-w-xl mx-auto border rounded-xl shadow-xl">
        {auth.type === 2 &&
          <FieldSet text="Руководитель">
            {managerTasks.map((task: any) =>
              <TaskCard
                key={task.id}
                id={task.id}
                name={task.name}
                deadline={new Date(task.deadline)}
                status={task.status}
              />
            )}
          </FieldSet>
        }
        {auth.type === 0 &&
          <FieldSet text="Ответственный">
            {ICTasks.map((task: any) =>
              <TaskCard
                key={task.id}
                id={task.id}
                name={task.name}
                deadline={new Date(task.deadline)}
                status={task.status}
              />
            )}
          </FieldSet>
        }
        {auth.type === 0 &&
          <FieldSet text="Исполнитель">
            {executorTasks.map((task: any) =>
              <TaskCard
                key={task.id}
                id={task.id}
                name={task.name}
                deadline={new Date(task.deadline)}
                status={task.status}
              />
            )}
          </FieldSet>
        }
      </div>
    </main>
  );
}

export default Home;
