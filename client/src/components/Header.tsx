import React, {useContext} from 'react';
import {Link, redirect} from "react-router-dom";
import {UserContext} from "../context/UserContext";

function Header() {
  const {logged, logout} = useContext(UserContext)

  const exitHandler = () => {
    logout()
    redirect("./")
  }

  return (
    <header className="bg-gray-900 fixed w-screen">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/" className="text-sm font-semibold leading-6 text-white">Главная</Link>
          <Link to="/teams" className="text-sm font-semibold leading-6 text-white">Команды</Link>
          <Link to="/tasks" className="text-sm font-semibold leading-6 text-white">Задачи</Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 lg:flex-1 lg:justify-end">
          {logged && <Link
              to="/profle"
              className="text-sm font-semibold leading-6 text-white"
          >Профиль</Link>}
          <button
            className="text-sm font-semibold leading-6 text-red-500"
            onClick={exitHandler}
          >Выйти
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;