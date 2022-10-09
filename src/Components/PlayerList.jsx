import React from 'react'

function PlayerList({players,disablePlayers=[],children,selectPlayer}) {
  console.log("players::",players,disablePlayers)
  return (
    <div>
      <label>{children}</label>
      <select onChange={(e)=>{selectPlayer(e.target.value)}}>
        <option disabled selected>Select Player</option>
        {
          players && players.map((player)=>{
            return (<option value={player.id} disabled={disablePlayers.includes(player.id)}>{player.fullname}</option>)
          })
        }
      </select>
    </div>
  )
}

export default PlayerList