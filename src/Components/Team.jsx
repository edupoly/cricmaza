import React,{useState} from 'react'
import { useEffect } from 'react'

function Team(props) {
  const [team, setTeam] = useState({})
  useEffect(()=>{
    var x = props.getTeamDetailsById(props.team)
    setTeam({...x})
  },[props.team])
  return (
    <div>
      <h1>{team.teamname && team.teamname.toUpperCase()}</h1>
      {
        team.players && team.players.map((player)=>{
          return <li>{player.fullname}</li>
        })
      }
    </div>
  )
}

export default Team