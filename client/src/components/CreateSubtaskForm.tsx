import React, {RefObject, useState} from "react";
import InputField from "./InputField";

interface CreateSubtaskProps {
  refs: RefObject<HTMLInputElement[]>,
  createHandler: () => {}
}

function CreateSubtaskForm({ refs, createHandler }: CreateSubtaskProps) {
  const [inputs] = useState([
    {id: "name", type: "text", name: "Название"},
    {id: "description", type: "text", name: "Описание"},
    {id: "deadline", type: "date", name: "Срок выполнения"}
  ])

  return (
    <form className="bg-gray-700 shadow-md rounded-xl px-8 py-6">
      { inputs.map(item =>
        <InputField key={item.id} id={item.id} type={item.type} name={item.name} refs={refs}/>)
      }
      <div className="flex flex-col justify-center items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 w-1/3 text-white font-bold py-2 px-4 rounded mx-auto"
          type="button"
          onClick={createHandler}
        >
          Создать
        </button>
      </div>
    </form>
  )
}

export default CreateSubtaskForm