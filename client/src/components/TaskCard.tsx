import {Link} from "react-router-dom";

interface TaskCardProps {
  id: number,
  name: string,
  deadline: Date,
}

function TaskCard({ id, name, deadline }: TaskCardProps) {
  return (
    <div className="w-[45%] p-6 border rounded-lg shadow-xl bg-gray-800 border-gray-700 mx-auto mt-3">
      <Link to={`/tasks/${id}`} >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{name}</h5>
      </Link>
      <p className="font-normal text-md text-gray-400">
        Срок выполнения: {
        [deadline.getDate(), deadline.getMonth() + 1, deadline.getFullYear()].join(".")
      }
      </p>
    </div>
  )
}

export default TaskCard