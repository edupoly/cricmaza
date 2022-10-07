import React,{useEffect, useState} from 'react'
import Innings from './Innings'
import Team from './Team'

function AddScore() {
  const [matchdate, setMatchdate] = useState(null)
  const [matches, setMatches] = useState([])
  const [teams, setTeams] = useState([])
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [selectedInnings, setSelectedInnings] = useState(null)
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
    return teams.find((team)=>{
      return team.id==id
    })
  }
  useEffect(()=>{
    fetch(`http://localhost:4000/matches?matchdate=${matchdate}`)
    .then(res=>res.json())
    .then(matches=>{
      if(matchdate && matches.length===0){
        alert("No match on the given date")
      }
      return setMatches([...matches])
    })
  },[matchdate])
  useEffect(()=>{
    fetch(`http://localhost:4000/teams`)
    .then(res=>res.json())
    .then(teams=>setTeams([...teams]))
  },[])
  function updateMatchInnings(firstInningsBattingTeamId,firstInningsBowlingTeamId){
    setSelectedMatch({...selectedMatch,innings:[{battingteam:firstInningsBattingTeamId,bowlingteam:firstInningsBowlingTeamId,balls:[]},{battingteam:firstInningsBowlingTeamId,balls:[],bowlingteam:firstInningsBattingTeamId}]})
  }
  useEffect(()=>{
    if(selectedMatch){
      fetch(`http://localhost:4000/matches/${selectedMatch.id}`,{
        method:'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...selectedMatch})
      })
      .then(res=>res.json())
      .then(data=>console.log(data))
      .catch((err)=>{
        
      })
    }
    
  },[selectedMatch])
  function updateMatchToss(tossteam){
    setSelectedMatch({...selectedMatch,toss:tossteam})
  }
  return (
    <div className='container'>
      <div className='row'>
        <div class="input-group col">
          <span class="input-group-text">Select the Date: </span>
          <input className='form-control' type='date' onChange={(e)=>{setMatchdate(e.target.value)}}></input>
        </div>
        {
          matches.length!=0 && ( 
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
          )
        } 
      </div>
      <div class='row'>
      {
        selectedMatch && (<>
          <div class="input-group col">
            <span class="input-group-text">Who won the toss: </span>
            <div className="input-group-text">
              <input type="radio" name='toss' id='toss' value={selectedMatch.team1} onChange={(e)=>{updateMatchToss(e.target.value)}}/>:<label  for="toss">{selectedMatch && getTeamNameById(selectedMatch.team1)}</label>
            </div>
            <div className="input-group-text">
              <input type="radio" name='toss' id='toss' value={selectedMatch.team2} onChange={(e)=>{updateMatchToss(e.target.value)}}/>:<label  for="toss">{selectedMatch && getTeamNameById(selectedMatch.team2)}</label>
            </div>
          </div>
          <div className="input-group col">
            <span className="input-group-text">First Innings Batting</span>
            <div className="input-group-text">
              <input type="radio" name='firstbatting' value={selectedMatch.team1} onChange={(e)=>{updateMatchInnings(e.target.value,selectedMatch.team2)}}/>:<label  for="toss">{selectedMatch && getTeamNameById(selectedMatch.team1)}</label>
            </div>
            <div className="input-group-text">
              <input type="radio" name='firstbatting' value={selectedMatch.team2} onChange={(e)=>{updateMatchInnings(e.target.value,selectedMatch.team1)}}/>:<label  for="toss">{selectedMatch && getTeamNameById(selectedMatch.team2)}</label>
            </div>
          </div>
        </>)
       }
      </div>
      <div className='m-2 p-2 border'>
        {
          
          selectedMatch && selectedMatch.innings && (<div className='container'>
          <div className="input-group col">
            <span className="input-group-text">Select Innings</span>
            <div className="input-group-text">
              <input type="radio" name='innings' id='innings' value={selectedMatch && JSON.stringify(selectedMatch.innings[0])} onChange={(e)=>{setSelectedInnings(e.target.value)}}/>:<label  for="toss">1st Innings</label>
            </div>
            <div className="input-group-text">
              <input type="radio" name='innings' id='innings' value={selectedMatch && JSON.stringify(selectedMatch.innings[1])} onChange={(e)=>{setSelectedInnings(e.target.value)}}/>:<label  for="toss">2nd Innings</label>
            </div>
          </div>
        </div>
        )
        }
        {selectedInnings && (
          <Innings selectedMatch={selectedMatch} innings={JSON.parse(selectedInnings)} getTeamDetailsById={getTeamDetailsById}></Innings>
        )}
      </div>
      
      
    </div>
  )
}

export default AddScore