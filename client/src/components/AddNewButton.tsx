import {Link} from "react-router-dom";
import React from "react";

interface AddNewButtonProps {
  link: string
}


function AddNewButton( {link} : AddNewButtonProps) {
  return (
    <button
      className="fixed top-24 right-4 w-10 h-10 bg-green-500 border rounded-3xl border-green-500"
      title="Добавить поручение"
    >
      <Link to={`./${link}`}>
        <p className="text-white font-semibold text-2xl absolute top-0.5 left-0 right-0 bottom-0">+</p>
      </Link>
    </button>
  )
}

export default AddNewButton