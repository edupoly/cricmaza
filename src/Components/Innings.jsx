import React from 'react'
import { connect } from 'react-redux'
import { getCurrentInningsId, getCurrrentInningsBattingTeam } from '../store/reducers/match.reducer'
import PlayerList from './PlayerList'
function Innings({inningsId,battingTeamPlayers}) {
  console.log("innings::",inningsId,battingTeamPlayers)
  return (
    <div className='border border-2 p-2'>
      Innings 
      <PlayerList players={battingTeamPlayers} disablePlayers={[19,17]}></PlayerList>
    </div>
  )
}
function mapStateToProps(state){
  return {
    inningsId:getCurrentInningsId(state),
    battingTeamPlayers:getCurrrentInningsBattingTeam(state),
  }
}
function mapDispatchToProps(dispatch){
  return {
    selectMatch:(match)=>{
      dispatch({type:'SELECT_MATCH',payload:match})
    }
  }
}
export default  connect(mapStateToProps,mapDispatchToProps)(Innings)