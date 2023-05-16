import React, {useContext, useEffect, useState} from "react"
import TeamCard from "../components/TeamCard"
import AddNewButton from "../components/AddNewButton"
import useHttp from "../hooks/http.hook"
import {UserContext} from "../context/UserContext";
import Loader from "../components/Loader";

function Teams() {
  const {loading, request} = useHttp()
  const [teams, setTeams] = useState([])
  const auth = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      const teams = await request(`/api/teams/available/${auth.username}`, 'GET', {})
      setTeams(teams)
    }

    fetchData().catch(err => {
    })
  }, [request, auth.username])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="pt-20 bg-gray-600">
      {auth.type === 2 && <AddNewButton link="create"/>}
      <h1 className="text-center text-white pt-2 text-3xl">Команды</h1>
      {teams.map((team: any) =>
        <TeamCard
          key={team.id}
          id={team.id}
          name={team.name}
          description={team.description}
          workersAmount={team.workersIds.length}
        />
      )}
    </div>
  )
}

export default Teams