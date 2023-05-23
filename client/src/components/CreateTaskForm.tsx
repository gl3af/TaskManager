import React, {Dispatch, RefObject, SetStateAction, useState} from "react";
import InputField from "./InputField";

interface CreateTaskProps {
  refs: RefObject<HTMLInputElement[]>,
  options: { id: number, name: string }[],
  setICId: Dispatch<SetStateAction<any>>,
  createHandler: () => {}
}

function CreateTaskForm({ refs, options, setICId, createHandler }: CreateTaskProps) {

  const [inputs] = useState([
    {id: "name", type: "text", name: "Название"},
    {id: "description", type: "text", name: "Описание"},
    {id: "deadline", type: "date", name: "Срок выполнения"}
  ])

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name: string = e.target.selectedOptions[0].innerText
    const selected = options.filter(option => option.name === name)[0]
    setICId(selected.id)
  }

  return (
    <form className="bg-gray-800 shadow-md rounded-xl px-8 pt-12 pb-8">
      { inputs.map(item =>
        <InputField key={item.id} id={item.id} type={item.type} name={item.name} refs={refs}/>)
      }
      <h1 className="text-white font-bold text-sm">Ответственный</h1>
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
          {options.map(x => <option key={x.id}>{x.name}</option>)}
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-700 w-1/3 text-white font-bold py-2 px-4 rounded mx-auto mt-4"
          type="button"
          onClick={createHandler}
        >
          Создать
        </button>
      </div>
    </form>
  )
}

export default CreateTaskForm