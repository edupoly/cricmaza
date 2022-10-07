import React from 'react'

function PlayerList({players,disablePlayers}) {
  console.log("players::",players,disablePlayers)
  return (
    <div>
      <select>
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