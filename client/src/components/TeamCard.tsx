import {Link} from "react-router-dom";

interface TeamCardProps {
  id: number,
  description: string
  workersAmount: number
}

function TeamCard({id, description, workersAmount}: TeamCardProps) {
  return (
    <div className="px-4 bg-gray-800 mx-auto">
      <p className="mb-0.5 font-normal text-md text-gray-700 dark:text-gray-400 text-justify">{description}</p>
      <p className="mb-3 font-normal text-md text-gray-700 dark:text-gray-400">Число участников: {workersAmount}</p>
      <Link
        to={`./${id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg
        focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
      >
        Подробнее
      </Link>
    </div>
  )
}

export default TeamCard