import React from 'react'
import { useEffect,useState } from 'react'

function Addteam() {
  const [newteam, setNewTeam] = useState({
    teamname:'',
    teamowner:'',
    players:[]
  })  
  const [allplayers, setAllplayers] = useState([])


  useEffect(()=>{
    console.log(allplayers)
    fetch("http://localhost:4000/players")
    .then((res)=>res.json())
    .then(data=>setAllplayers(data))
  },[])

  useEffect(()=>{
    console.log("newteam::",newteam)
  },[newteam])

  function addTeam(){
    fetch("http://localhost:4000/teams",{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newteam)
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    
  }

  function selectPlayer(i){
    setNewTeam({...newteam,players:[...newteam.players,allplayers[i]]})
    var temp = [...allplayers]
    temp.splice(i,1)
    setAllplayers([...temp])
  }
  function unselectplayer(i){
    var temp = [...newteam.players];
    var x = temp.splice(i,1);
    setNewTeam({...newteam,players:[...temp]})
    setAllplayers([...allplayers,x[0]])
  }
  return (
    <div>
      <input type="text" className='form-control' placeholder='teamname' onChange={(e)=>{setNewTeam({...newteam,teamname:e.target.value})}} />
      <input type="text" className='form-control' placeholder='teamowner' onChange={(e)=>{setNewTeam({...newteam,teamowner:e.target.value})}} />
      <div className='d-flex flex-wrap'>
        <div className='w-50 border'>
          players
          {
            allplayers && allplayers.map((player,i)=>{
              return(<li key={i}>
                {player.fullname}
                <button onClick={()=>{selectPlayer(i)}}>Select</button>
              </li>)
            })
          }
        </div>
        <div className='w-50 border'>
          selected players
          {
            newteam.players && newteam.players.map((player,i)=>{
              return(
                <li>
                  {player.fullname}
                  <button onClick={()=>{unselectplayer(i)}}>remove</button>
                </li>
              )
            })
          }
          <button className='btn btn-success' onClick={addTeam}>Add Team</button>
        </div>
        
      </div>
    </div>
  )
}

export default Addteam