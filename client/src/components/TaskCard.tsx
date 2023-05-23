import {Link} from "react-router-dom";

interface TaskCardProps {
  id: number,
  name: string,
  deadline: Date,
  status: string
}

function TaskCard({ id, name, deadline, status}: TaskCardProps) {
  function difference(now: Date, end: Date) {
    const msPerDay = 1000 * 60 * 60 * 24
    const nowUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
    const endUTC = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate())

    return Math.floor((endUTC - nowUTC) / msPerDay)
  }

  const left = difference(new Date(Date.now()), deadline)
  const data = left >= 0 ? `Осталось дней: ${left}` : "Просрочено"

  return (
    <div className="px-4 bg-gray-800 relative pb-2">
      <p className="text-md text-gray-400 top-2 right-3 absolute">{status}</p>
      <Link to={`/tasks/${id}`} >
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white">{name}</h5>
      </Link>
      <p className="font-normal text-md text-gray-400">
        Срок выполнения: {
        [deadline.getDate(), deadline.getMonth() + 1, deadline.getFullYear()].join(".")
      }
      </p>
      <p className="font-normal text-md text-gray-400">{data}</p>
    </div>
  )
}

export default TaskCard