import React from 'react';
import {Link} from "react-router-dom";
import person from "../icons/person.png"
interface AddExecutorButtonProps {
  link: string
}

const AddExecutorButton = ({ link } : AddExecutorButtonProps) => {
  return (
    <button
      className="fixed top-36 right-4 w-10 h-10 bg-blue-500 border rounded-3xl border-blue-500"
      title="Добавить исполнителя"
    >
      <Link to={`./${link}`}>
        <img className="w-7 h-7 mx-auto" src={person} alt="Лого"/>
      </Link>
    </button>
  )
}

export default AddExecutorButton;