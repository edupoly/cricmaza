import React from 'react'
import PlayerList from './PlayerList'

function Bowler({getPlayerDetailsById,allPlayers,bowlingTeamPlayers,setBowler,lastOverBowler,bowler}) {
  return (
      <div className='input-group'>
        <div className='input-group-prepend'>
          <div className='input-group-text'>Bowler:</div>
        </div>
        <div className='form-control'>
          {getPlayerDetailsById(allPlayers, bowler) && getPlayerDetailsById(allPlayers, bowler).fullname}
          {!bowler && (<PlayerList players={bowlingTeamPlayers} selectPlayer={setBowler} disablePlayers={[lastOverBowler]}></PlayerList>)}
        </div>
        {bowler && (<div className='input-group-append'>
          <div className='input-group-text'><span onClick={() => { setBowler(null) }}>Change</span></div>
        </div>)}
      </div>
    
  )
}

export default Bowler