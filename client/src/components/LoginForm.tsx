import React, {RefObject, useState} from "react";
import InputField from "./InputField";
import {Link} from "react-router-dom";

interface AuthInputProps {
  refs: RefObject<HTMLInputElement[]>,
  loginHandler: () => {}
}

function LoginForm({refs, loginHandler}: AuthInputProps) {
  const [inputs] = useState([
    {id: "username", type: "text", name: "Логин"},
    {id: "password", type: "password", name: "Пароль"}
  ])

  return (
    <form className="bg-gray-700 shadow-md rounded-xl px-8 pt-6 pb-8">
      { inputs.map(item =>
        <InputField key={item.id} id={item.id} type={item.type} name={item.name} refs={refs}/>)
      }
      <div className="flex flex-col items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 w-1/3 text-white font-bold py-2 px-4 rounded data-modal-target='popup-modal' data-modal-toggle='popup-modal'"
          type="button"
          onClick={loginHandler}
        >
          Войти
        </button>
        <p className="text-white mt-2">
          Нет аккаунта?
          <Link className="text-blue-500 pl-2 hover:text-blue-700" to="/register">Зарегистрироваться</Link>
        </p>


      </div>
    </form>
  )
}

export default LoginForm