import React,{useState} from 'react'
import { connect } from 'react-redux'
import { getCurrentInningsId, getCurrrentInningsBattingTeam, getCurrrentInningsBowlingTeam, getNonStriker, getStriker } from '../store/reducers/match.reducer'
import { getAllPlayers, getPlayerDetailsById } from '../store/reducers/player.reducer';
import BallType from './BallType'
import PlayerList from './PlayerList'
import Runs from './Runs'
import Wicket from './Wicket'
function Innings({allPlayers,inningsId,battingTeamPlayers,bowlingTeamPlayers,striker=null,selectStriker,nonStriker=null,selectNonStriker,swapStrikers}) {
  const [ballType, setballType] = useState(null);
  const [runType, setRunType] = useState(null);
  const [runs, setRuns] = useState(null)
  const [bowler, setBowler] = useState(null);
  const [lastOverBowler, setLastOverBowler] = useState(null)
  return (
    <div className='border border-2 p-2'>
      <div className='d-flex flex-wrap justify-content-around '>
        <div>
          <h3>Striker:{getPlayerDetailsById(allPlayers,striker) && getPlayerDetailsById(allPlayers,striker).fullname}</h3>
          {!striker && (<PlayerList players={battingTeamPlayers} disablePlayers={[13,16,nonStriker]} selectPlayer={selectStriker}>Striker : </PlayerList>)}
          {striker && (<button onClick={()=>{selectStriker(null)}}>Change</button>)}
        </div>
        <div>
          <h3>NonStriker:{getPlayerDetailsById(allPlayers,nonStriker) && getPlayerDetailsById(allPlayers,nonStriker).fullname}</h3>
          {!nonStriker && (<PlayerList players={battingTeamPlayers} disablePlayers={[13,16,striker]} selectPlayer={selectNonStriker}>NonStriker : </PlayerList>)}
          {nonStriker && (<button onClick={()=>{selectNonStriker(null)}}>Change</button>)}
        </div>
        <div>
          <button onClick={()=>{swapStrikers(striker,nonStriker)}}>Swap Strikers</button>
        </div>
      </div>
      <PlayerList players={bowlingTeamPlayers} selectPlayer={setBowler} disablePlayers={[lastOverBowler]}>Bowler:</PlayerList>
      <BallType setballType={setballType}></BallType>
      <Runs setRunType={setRunType} setRuns={setRuns} runs={runs} runType={runType}></Runs>
      <Wicket striker={striker} nonStriker={nonStriker} bowler={bowler} bowlingTeam={bowlingTeamPlayers}></Wicket>
    </div>
  )
}
function mapStateToProps(state){
  console.log("state:: in ",state)
  
  return {
    inningsId:getCurrentInningsId(state),
    battingTeamPlayers:getCurrrentInningsBattingTeam(state),
    bowlingTeamPlayers:getCurrrentInningsBowlingTeam(state),
    striker:Number(getStriker(state)),
    nonStriker:Number(getNonStriker(state)),
    allPlayers:getAllPlayers(state)
  }
}
function mapDispatchToProps(dispatch){
  return {
    selectStriker:(player)=>{
      dispatch({type:'UPDATE_STRIKER',payload:player})
    },
    selectNonStriker:(player)=>{
      dispatch({type:'UPDATE_NONSTRIKER',payload:player})
    },
    swapStrikers:(striker,nonStriker)=>{
      dispatch({type:'UPDATE_STRIKER',payload:nonStriker})
      dispatch({type:'UPDATE_NONSTRIKER',payload:striker})
    }
  }
}
export default  connect(mapStateToProps,mapDispatchToProps)(Innings)