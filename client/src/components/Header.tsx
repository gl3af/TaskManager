import React, {useContext, useEffect, useState} from 'react';
import {Link, redirect} from "react-router-dom";
import {UserContext} from "../context/UserContext";
import useHttp from "../hooks/http.hook";

function Header() {
  const auth = useContext(UserContext)
  const {request} = useHttp()
  const [hasNew, setHasNew] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (auth.username !== '') {
        const notifications = await request(`api/notifications/${auth.username}/new`, 'GET', {})
        setHasNew(notifications.length > 0)
      }
    }
    const interval = setInterval(() => fetch(), 200)

    return () => clearInterval(interval)
  }, [request, auth.username])

  const animate = hasNew ? " animate-pulse" : ""

  const exitHandler = () => {
    auth.logout()
    redirect("./")
  }

  const linkStyle = "text-md font-semibold leading-6 text-white"

  return (
    <header className="bg-gray-900 fixed w-screen z-10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/" className={linkStyle}>Мои задачи</Link>
          <Link to="/teams" className={linkStyle}>Команды</Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 lg:flex-1 lg:justify-end">
          {auth.logged && <Link
              to="/notifications"
              className={linkStyle + animate}
          >Уведомления</Link>}
          <button
            className="text-md font-semibold leading-6 text-red-500"
            onClick={exitHandler}
          >Выйти
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;