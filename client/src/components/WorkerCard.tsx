import phone from "../icons/phone.png"
import mail from "../icons/email.png"

interface WorkerCardProps {
  surname: string,
  name: string,
  lastname: string,
  email: string
  phoneNumber: string
}

function WorkerCard({ surname, name, lastname, email, phoneNumber }: WorkerCardProps) {
  return (
    <div className="w-[45%] p-6 border rounded-lg shadow-xl bg-gray-800 border-gray-700 mx-auto mt-6">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
        {[surname, name, lastname].join(' ')}
      </h5>
      <div className="flex">
        <img src={mail} className="mt-1.5 w-4 h-3.5" alt=""/>
        <p className="pl-2 font-normal text-md text-gray-700 dark:text-gray-400">
          <a href={"mailto:" + email}>{email}</a>
        </p>
      </div>
      <div className="flex">
        <img src={phone} className="mt-1.5 w-3.5 h-3.5" alt=""/>
        <p className="pl-2 font-normal text-md text-gray-700 dark:text-gray-400">
          <a href={"tel:" + phoneNumber}>{phoneNumber}</a>
        </p>
      </div>
    </div>
  )
}

export default WorkerCard