import axios from 'axios'
export function fetchMatches(){
  return axios.get("http://localhost:4000/matches")
}
export function fetchPlayers(){
  return axios.get("http://localhost:4000/players")
}
export function fetchTeams(){
  return axios.get("http://localhost:4000/teams")
}
export function addBallToMatch(match,newball,inningsId,striker,nonStriker){
  return (dispatch)=>{
    var temp = JSON.parse(JSON.stringify(match));
    temp.innings[inningsId].balls.push(newball);
    temp.innings[inningsId].striker=striker;
    temp.innings[inningsId].nonStriker=nonStriker;

    console.log("match::",temp)
    fetch("http://localhost:4000/matches/"+match.id, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(temp) // body data type must match "Content-Type" header
    })
    .then(res=>res.json())
    .then(data=>dispatch({type:'SELECT_MATCH',payload:data}))
  }
}
  