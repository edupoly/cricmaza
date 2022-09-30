import React,{useState} from 'react'

function AddPlayer() {
  const [newplayer, setnewplayer] = useState({
    fullname:'',
    dob:'',
    battingStyle:'',
    bowlingStyle:''
  })
  function addPlayer(){
    console.log(newplayer)
    fetch("http://localhost:4000/players",{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newplayer)
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
  }
  return (
    <div>
      <div className='container'>
        <h1>Add Player Details</h1>
        <input type="text" placeholder='Full Name' className="form-control" onChange={(e)=>{setnewplayer({...newplayer,fullname:e.target.value})}}/><br></br>
        <input type="date" placeholder='Date of Birth' className="form-control" onChange={(e)=>{setnewplayer({...newplayer,dob:e.target.value})}} /><br></br>
        <input type="text" placeholder='Batting Style' className="form-control"  onChange={(e)=>{setnewplayer({...newplayer,battingStyle:e.target.value})}}/><br></br>
        <input type="text" placeholder='Bowling Style' className="form-control" onChange={(e)=>{setnewplayer({...newplayer,bowlingStyle:e.target.value})}} /><br></br>
        <button onClick={addPlayer}>Add Player</button>
      </div>
    </div>
  )
}

export default AddPlayer
