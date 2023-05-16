import {Link} from "react-router-dom";
function NoPage() {
  return (
    <main className="grid place-items-center bg-grey-700 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-red-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Страница не найдена</h1>
        <p className="mt-6 text-base leading-7 text-white">Страница, по которой вы хотели перейти, не существует</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Домой
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NoPage;