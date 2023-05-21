import React from 'react';

interface NotificationCardProps {
  id: number,
  description: string,
  taskId: number,
  read: boolean,
  onClick: (id: number, taskId: number) => {}
}

const NotificationCard = ({id, description, taskId, read, onClick} : NotificationCardProps) => {
  const animate = read ? "" : "animate-pulse"
  return (
    <div
      className={"w-2/5 p-6 rounded-lg shadow-xl bg-gray-800 mx-auto my-6 flex justify-center cursor-pointer " + animate}
      onClick={() => onClick(id, taskId)}>
      <p className="text-white">{description}</p>
    </div>
  );
};

export default NotificationCard;