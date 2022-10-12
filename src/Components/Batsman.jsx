import React from 'react'
import PlayerList from './PlayerList'

function Batsman({striker,getPlayerName,allPlayers,battingTeamPlayers,nonStriker,selectStriker}) {
  return (
    <div className='input-group w-25'>
      <div className='form-control'>
        {striker?(<b>*{getPlayerName(allPlayers,striker)}</b>):(<PlayerList players={battingTeamPlayers} disablePlayers={[13, 16, nonStriker]} selectPlayer={selectStriker}>Striker</PlayerList>)}
      </div>
      <div className='input-group-append'>
        <div className='input-group-text'>{striker && (<span onClick={() => { selectStriker(null) }}>Change</span>)}</div>
      </div>
    </div>
  )
}

export default Batsman