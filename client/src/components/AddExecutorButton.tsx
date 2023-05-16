import React from 'react';
import {Link} from "react-router-dom";
import person from "../icons/person.png"
interface AddExecutorButtonProps {
  link: string
}

const AddExecutorButton = ({ link } : AddExecutorButtonProps) => {
  return (
    <button
      className="fixed top-[140px] right-4 w-[40px] h-[40px] bg-blue-500 border rounded-3xl border-blue-500"
      title="Добавить исполнителя"
    >
      <Link to={`./${link}`}>
        <img className="w-7 h-7 mx-auto" src={person} alt="Лого"/>
      </Link>
    </button>
  )
}

export default AddExecutorButton;