import React, {RefObject} from "react";

interface InputFieldProps {
  id: string,
  type: string,
  name: string
  refs: RefObject<HTMLInputElement[]>
}

function InputField ({id, type, name, refs}: InputFieldProps) {
  const checkbox = "w-5 h-5 text-blue-600 rounded-xl focus:ring-2 focus:ring-blue-600 border-gray-600 bg-blue-600"
  const input = "shadow appearance-none w-full h-[40px] py-2 px-3 text-gray-700 mb-3 leading-tight border rounded"
  const style = type === "checkbox" ? checkbox : input

  return (
    <div className="mb-4">
      <label
        className="block text-white text-sm font-bold mb-2"
        htmlFor={id}
      >
        {name}
      </label>
      <input
        className={style}
        id={id}
        type={type}
        placeholder={name}
        autoComplete="off"
        ref={(ref: HTMLInputElement) =>
          !refs.current?.includes(ref) && refs.current?.push(ref)
        }
      />
    </div>
  )
}

export default InputField