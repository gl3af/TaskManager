import React, {Dispatch, RefObject, SetStateAction, useState} from "react";
import InputField from "./InputField";

interface CreateTeamProps {
  refs: RefObject<HTMLInputElement[]>,
  options: {id: number, name: string}[],
  selectedOptions: {id: number, name: string}[],
  setOptions: Dispatch<SetStateAction<any>>
  setSelectedOptions: Dispatch<SetStateAction<any>>
  createHandler: () => {}
}

function CreateTeamForm(
  { refs, options, selectedOptions, setOptions, setSelectedOptions, createHandler }: CreateTeamProps) {

  const [inputs] = useState([
    {id: "name", type: "text", name: "Название"},
    {id: "description", type: "text", name: "Описание"}
  ])

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const name: string = e.target.selectedOptions[0].innerText
    const selected = options.filter(option => option.name === name)[0]
    setSelectedOptions((prev: any) => [...prev, selected])
    setOptions((prev: any[]) => prev.filter(option => option.name !== name))
  }

  const removeHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const item = e.target as HTMLButtonElement
    const name: string = item.parentElement ? item.parentElement.innerText : ''
    setSelectedOptions((prev: any[]) => prev.filter(option => option.name !== name))
    const selected = selectedOptions.filter(option => option.name === name)[0]
    setOptions((prev: any) => [...prev, selected])
  }

  return (
    <form className="bg-gray-700 shadow-md rounded-xl px-8 pt-12 pb-8">
      { inputs.map(item =>
        <InputField key={item.id} id={item.id} type={item.type} name={item.name} refs={refs}/>)
      }
      <div className="mb-2">
        <h1 className="text-white font-semibold">Сотрудники: </h1>
        <div className="flex flex-col items-center justify-center">
          {selectedOptions.map(x =>
            <div className="relative w-1/2 rounded-md bg-gray-800 mb-2 h-[26px] items-center" key={x.id}>
              <p className="text-center text-white absolute left-0 right-0">{x.name}</p>
              <button
                className="text-center text-red-600 font-semibold absolute right-1 after:content-['\00d7']"
                onClick={removeHandler}
              />
            </div>
          )}
        </div>
      </div>
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

export default CreateTeamForm