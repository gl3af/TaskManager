import React, {createRef, useState} from 'react';
import useHttp from "../hooks/http.hook";
import {useNavigate, useParams} from "react-router-dom";

const CreateCard = () => {
  const { id } = useParams<string>()
  const [files, setFiles] = useState<any[]>([])
  const {request} = useHttp()
  const ref = createRef<HTMLTextAreaElement>()
  const navigate = useNavigate()

  const submit = async () => {
    let documents = []
    const description = ref.current?.value
    if (files.length > 0) {
      for (let file of files) {
        let formData = new FormData();
        formData.append("fileData", file);
        const document = await request('api/files/upload', 'POST', formData)
        documents.push(document)
      }
    }
    const task_id = id || ""
    await request(`api/tasks/${+task_id}/create-card`, 'POST', {
      description, documents
    })
    navigate("./../")
  }

  return (
    <main className="pt-20">
      <h2 className="text-center text-white font-semibold pb-3 text-3xl">Карточка исполнения</h2>
      <div className="max-w-2xl mx-auto py-4 bg-gray-800 rounded-xl flex flex-col items-center">
        <div className="w-2/3">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor={"description"}
          >
            Описание
          </label>
          <textarea
            className="shadow appearance-none w-full h-[200px] py-2 px-3 text-gray-700 mb-3 leading-tight border rounded"
            id={"description"}
            placeholder={"Описание"}
            autoComplete="off"
            ref={ref}
          />
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="documents"
          >
            Документы (при необходимости)
          </label>
          <input
            id="documents"
            className="w-full h-[40px] py-2 px-3 text-white leading-tight border rounded"
            type="file"
            multiple
            onChange={(event: any) => {
              setFiles(event.target.files)
            }}/>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 w-1/3 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={submit}>Добавить
        </button>
      </div>
    </main>
  );
};

export default CreateCard;