import React,{useEffect, useState} from 'react'
import Team from './Team'

function AddScore() {
  const [matchdate, setMatchdate] = useState(null)
  const [matches, setMatches] = useState([])
  const [teams, setTeams] = useState([])
  const [selectedMatch, setSelectedMatch] = useState({})
  function getTeamNameById(id){
    if(id){
      return teams.find((team)=>{
        return team.id==id
      }).teamname
    }
    else{
      return null
    }
  }
  function getTeamDetailsById(id){
    console.log(id)
    return teams.find((team)=>{
      return team.id==id
    })
  }
  useEffect(()=>{
    fetch(`http://localhost:4000/matches?matchdate=${matchdate}`)
    .then(res=>res.json())
    .then(matches=>setMatches([...matches]))
  },[matchdate])
  useEffect(()=>{
    fetch(`http://localhost:4000/teams`)
    .then(res=>res.json())
    .then(teams=>setTeams([...teams]))
  },[])
  return (
    <div className='container'>
      <div className='row'>
        <input className='form-control col' type='date' onChange={(e)=>{setMatchdate(e.target.value)}}></input>
        <select className='form-control col' onChange={(e)=>{setSelectedMatch(JSON.parse(e.target.value))}}>
          <option disabled selected>please select a match</option>
          {
            matches && matches.map((match)=>{
              return(
                <option value={JSON.stringify(match)}>{getTeamNameById(match.team1)}(vs){getTeamNameById(match.team2)}</option>
              )
            })
          }
        </select>
      </div>
      <div class='row'>
        <div class="input-group col">
          <span class="input-group-text">Who won the toss: </span>
          <div className="input-group-text">
            <input type="radio" name='toss' id='toss'/>:<label  for="toss">{selectedMatch && getTeamNameById(selectedMatch.team1)}</label>
          </div>
          <div className="input-group-text">
            <input type="radio" name='toss' id='toss'/>:<label  for="toss">{selectedMatch && getTeamNameById(selectedMatch.team2)}</label>
          </div>
        </div>
      </div>
      
      <Team team={selectedMatch.team1} getTeamDetailsById={getTeamDetailsById}></Team>
      <Team team={selectedMatch.team2} getTeamDetailsById={getTeamDetailsById}></Team>
    </div>
  )
}

export default AddScore