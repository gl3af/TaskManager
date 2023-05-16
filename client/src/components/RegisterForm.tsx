import React, {useState} from "react";
import InputField from "./InputField";

interface RegisterFromProps {
  refs: React.MutableRefObject<HTMLInputElement[]>,
  registerHandler: () => {}
}

function RegisterForm({refs, registerHandler}: RegisterFromProps) {
  const [inputs] = useState([
    {id: "username", type: "text", name: "Логин"},
    {id: "password", type: "password", name: "Пароль"},
    {id: "surname", type: "text", name: "Фамилия"},
    {id: "name", type: "text", name: "Имя"},
    {id: "lastName", type: "text", name: "Отчество"},
    {id: "phoneNumber", type: "text", name: "Телефон"},
    {id: "email", type: "text", name: "Почта"},
    {id: "isManager", type: "checkbox", name: "Я - руководитель"}
  ])

  return (
    <form className="bg-gray-700 shadow-md rounded-xl px-8 pt-12 pb-8">
      { inputs.map(item =>
        <InputField key={item.id} id={item.id} type={item.type} name={item.name} refs={refs}/>) 
      }
      <div className="flex flex-col">
        <button
          className="bg-green-500 hover:bg-green-700 w-1/3 text-white font-bold py-2 px-4 rounded mx-auto"
          type="button"
          onClick={registerHandler}
        >
          Регистрация
        </button>
      </div>
    </form>
  )
}

export default RegisterForm