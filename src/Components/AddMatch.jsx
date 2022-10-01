import React,{useState} from 'react'
import { useEffect } from 'react'
var initialMatch = {
  "team1": "",
  "team2": "",
  "matchdate": null,
  "matchvenue": "",
}
function AddMatch() {
  const [teams, setTeams] = useState([])
  const [match, setMatch] = useState({...initialMatch})
  useEffect(()=>{
    fetch("http://localhost:4000/teams")
    .then(res=>res.json())
    .then(teams=>{setTeams([...teams])})
  },[])
  function getTeamNameById(id){
    return teams.find((team)=>{
      return team.id==id
    }).teamname
  }
  function addMatch(){
    console.log(match)
    fetch("http://localhost:4000/matches",{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(match)
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
  }
  return (
    <div className='container'>
      <h1>Add Match</h1>
      <input className="form-control" placeholder='Enter Match Date' type="date" onChange={(e)=>{setMatch({...match,matchdate:e.target.value})}} />
      <input className="form-control" placeholder='Enter Match venue' type="text" onChange={(e)=>{setMatch({...match,matchvenue:e.target.value})}} />
      <select className='form-control' onChange={(e)=>{setMatch({...match,team1:e.target.value})}} >
        <option value={null} selected disabled >Please select team1</option>
        {
          teams && teams.map((team,i)=>{
            return(
              <option value={team.id} disabled={match.team2==team.id}>{team.teamname.toUpperCase()}</option>
            )
          })
        }
      </select>
      <select className='form-control' onChange={(e)=>{setMatch({...match,team2:e.target.value})}}>
        <option value={null} selected disabled >Please select team2</option>
        {
          teams && teams.map((team,i)=>{
            return(
              <option value={team.id} disabled={match.team1==team.id}>{team.teamname.toUpperCase()}</option>
            )
          })
        }
      </select>
      {
        match.team1 && match.team2 && (
          <h1 className='text-center'>
            {match.team1 && getTeamNameById(match.team1).toUpperCase()} (vs) {match.team2 && getTeamNameById(match.team2).toUpperCase()}
          </h1>
        )
      }
      
      <button onClick={addMatch}>Add Match</button>
    </div>
  )
}

export default AddMatch