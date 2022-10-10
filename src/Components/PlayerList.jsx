import React from 'react'

function PlayerList({players,disablePlayers=[],children,selectPlayer}) {
  return (
    <div>
      <label>{children}</label>
      <select onChange={(e)=>{selectPlayer(e.target.value)}}>
        <option disabled selected value={null}>Select Player</option>
        {
          players && players.map((player,i)=>{
            return (<option value={player.id} key={i} disabled={disablePlayers.includes(player.id)}>{player.fullname}</option>)
          })
        }
      </select>
    </div>
  )
}

export default PlayerList