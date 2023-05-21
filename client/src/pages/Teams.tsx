import React, {useContext, useEffect, useState} from "react"
import TeamCard from "../components/TeamCard"
import AddNewButton from "../components/AddNewButton"
import useHttp from "../hooks/http.hook"
import {UserContext} from "../context/UserContext";
import Loader from "../components/Loader";
import FieldSet from "../components/FieldSet";

function Teams() {
  const {loading, request} = useHttp()
  const [teams, setTeams] = useState([])
  const auth = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      if (auth.username !== '') {
        const teams = await request(`/api/teams/available/${auth.username}`, 'GET', {})
        setTeams(teams)
      }
    }

    fetchData().catch(err => {
    })
  }, [request, auth.username])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="pt-20 bg-gray-700">
      {auth.type === 2 && <AddNewButton link="create"/>}
      <h1 className="text-center text-white text-3xl pb-3 font-semibold">Команды</h1>
      <div className="bg-gray-800 max-w-xl mx-auto rounded-xl border shadow-xl">
        {teams.map((team: any) =>
          <FieldSet text={team.name}>
            <TeamCard
              key={team.id}
              id={team.id}
              description={team.description}
              workersAmount={team.workersIds.length}
            />
          </FieldSet>
        )}
      </div>
    </div>
  )
}

export default Teams