import React, {useContext, useEffect, useState} from 'react';
import useHttp from "../hooks/http.hook";
import {UserContext} from "../context/UserContext";
import Loader from "../components/Loader";
import NotificationCard from "../components/NotificationCard";
import {redirect, useNavigate} from "react-router-dom";

const Notifications = () => {
  const {loading, request} = useHttp()
  const auth = useContext(UserContext)
  const [notifications, setNotifications] = useState<any>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetch = async () => {
      if (auth.username !== '') {
        const data = await request(`api/notifications/${auth.username}`, 'GET', {})
        setNotifications(data)
      }
    }
    fetch().catch(err => {})
    return () => setNotifications([])
  }, [request, auth.username])

  const onClick = async (id: number, taskId: number) => {
    await request(`api/notifications/${id}`, 'PUT', {read: true})
    navigate(`/tasks/${taskId}`)
  }

  if (loading) return <Loader />

  return (
    <main className="pt-20">
      <h2 className="text-center text-white py-4 text-3xl">Уведомления</h2>
      {notifications.map((item: any) =>
        <NotificationCard
          key={item.id}
          id={item.id}
          description={item.description}
          taskId={item.taskId}
          read={item.read}
          onClick={onClick}
        />
      )}
    </main>
  );
};

export default Notifications;