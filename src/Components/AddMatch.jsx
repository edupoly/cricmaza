import React,{useState} from 'react'
import { useEffect } from 'react'
var initialMatch = {
  team1:'',
  team2:'',
  matchdate:null,
  matchvenue:''
}
function AddMatch() {
  const [teams, setTeams] = useState([])
  const [match, setMatch] = useState({...initialMatch})
  useEffect(()=>{
    fetch('http://localhost:4000/teams')
    .then(res=>res.json())
    .then(teams=>setTeams([...teams]))
  },[])
  function getTeamNameById(id){
    return teams.find(team=>team.id==id).teamname
  }
  function addMatch(){
    console.log(match,initialMatch)
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
    <div>
      <h1>Add Match here</h1>
      <div className='p-3'>
        <input defaultValue={match.matchdate} onChange={(e)=>{setMatch({...match,matchdate:e.target.value})}} className='form-control' type='date' placeholder='select the date' ></input>
        <input onChange={(e)=>{setMatch({...match,matchvenue:e.target.value})}} className='form-control' type="text" placeholder='enter ground'/>
      </div>
      <div className='d-flex flex-wrap justify-content-around'>
        <div className='w-50 text-end p-3'>
          Team1<br/>
          <select onChange={(e)=>{setMatch({...match,team1:e.target.value})}}>
            <option disabled selected >Please select team 1</option>
            {
              teams && teams.map((team,i)=>{
                return (<option value={team.id}>{team.teamname.toUpperCase()}</option>)
              })
            }
          </select>
        </div>
        <div className='w-50  p-3'>
          Team2<br/>
          <select onChange={(e)=>{setMatch({...match,team2:e.target.value})}}>
            <option disabled selected >Please select team 2</option>
            {
              teams && teams.map((team,i)=>{
                return (<option value={team.id}>{team.teamname.toUpperCase()}</option>)
              })
            }
          </select>
        </div>
      </div>
      <div class="d-flex mb-3">
        <div class="p-3 flex-grow-1 text-end h3 text-uppercase">{match.team1 && getTeamNameById(match.team1)}</div>
        <div class="p-3 bg-warning">(VS)</div>
        <div class="p-3 flex-grow-1 h3 text-uppercase">{match.team2 && getTeamNameById(match.team2)}</div>
      </div>
      <div className='text-center d-grid p-4'>
        <button className='btn btn-success btn-block' onClick={addMatch}>Add Match</button>
      </div>
    </div>
  )
}

export default AddMatch