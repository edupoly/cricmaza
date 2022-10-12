import React, { useState } from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux'
import { addBallToMatch } from '../store/apis/cric.api';
import { getCurrentInningsId, getCurrrentInningsBattingTeam, getCurrrentInningsBowlingTeam, getNonStriker, getStriker } from '../store/reducers/match.reducer'
import { getAllPlayers, getPlayerDetailsById } from '../store/reducers/player.reducer';
import BallType from './BallType'
import Bowler from './Bowler';
import PlayerList from './PlayerList'
import Runs from './Runs'
import Wicket from './Wicket'
function Innings({ addNewBall, allPlayers, match,inningsId, battingTeamPlayers, bowlingTeamPlayers}) {
  const [ballType, setballType] = useState(null);
  const [runType, setRunType] = useState(null);
  const [runs, setRuns] = useState(null)
  const [bowler, setBowler] = useState(null);
  const [lastOverBowler, setLastOverBowler] = useState(null)
  const [wicket, setWicket] = useState(null)
  const [ballCount, setBallCount] = useState(0)
  const [over, setOver] = useState(0)
  const [totalruns, setTotalruns] = useState(0)
  const [totalwickets, setTotalwickets] = useState(0)
  const [outbatsmen, setOutbatsmen] = useState([])
  const [striker, setStriker] = useState(null)
  const [nonStriker, setNonStriker] = useState(null)
  function getPlayerName(allPlayers,playerId) {
    return getPlayerDetailsById(allPlayers, playerId)?.fullname;
  }
  function swapStrikers(){
    setStriker(nonStriker)
    setNonStriker(striker)
  }
  useEffect(()=>{
    if(ballCount===6){
      setLastOverBowler(bowler)
      setBallCount(0)
      setOver(over+1)
      swapStrikers()
    }
  },[ballCount])


  function addBall() {
    var outBatsmen = [];
    var ballruns = {
      batsmanruns: 0,
      extraruns: []
    }
    var extras = {
      extraruntype: null,
      runs: 0
    }
    if (ballType !== 'normal') {
      extras.extraruntype = ballType;
      extras.runs = 1;
      ballruns.extraruns.push({ ...extras })
    }
    else{
      setBallCount(ballCount+1)
    }
    if (runType === 'normal') {
      ballruns.batsmanruns = runs;
    }
    else {
      extras.extraruntype = runType;
      extras.runs = runs;
      ballruns.extraruns.push({ ...extras })
    }
    if([1,3,5].includes(runs)){
      swapStrikers(striker,nonStriker)
    }
    if(wicket.wicketType!=='nowicket') {
      setOutbatsmen([...outBatsmen,wicket.outbatsman])
    }
    setTotalruns(()=>{
      var batruns=ballruns.batsmanruns;
      var er1 = ballruns.extraruns[0]?ballruns.extraruns[0].runs:0;
      var er2 = ballruns.extraruns[1]?ballruns.extraruns[1].runs:0;
      return totalruns+batruns+er1+er2;
    })
    var newBall={
      bowler,
      ballType,
      batsman:striker,
      runs: { ...ballruns },
      wicket
    }
    if(match){
      addNewBall(match,newBall,inningsId,striker,nonStriker)
    }
  }
  
  useEffect(()=>{console.log("totalruns")},[totalruns]);
  return (
    <div className='border border-2 p-2 row'>
      <div className='col-md-6'>
        <div className='row text-center'>
          <div className='col-md-5'>
            {striker},{nonStriker}
          {striker
            ?(<>
                <b>*{getPlayerName(allPlayers,striker)}</b>
                <span className="btn bi bi-pencil-square" onClick={() => { setStriker(null) }}></span>
              </>)
            :(<PlayerList players={battingTeamPlayers} disablePlayers={[13, 16, nonStriker]} selectPlayer={setStriker}>Striker</PlayerList>)}
          </div>
          <div className='col-2'>
            <button className="btn btn-primary" onClick={() => { swapStrikers() }}>Swap</button>
          </div>
          <div className='col-md-5'>
            {nonStriker
            ?(<>
                <b>{getPlayerName(allPlayers,nonStriker)}</b>
                <span className="btn bi bi-pencil-square" onClick={() => { setNonStriker(null) }}></span>
              </>)
            :(<PlayerList players={battingTeamPlayers} disablePlayers={[13, 16, striker]} selectPlayer={setNonStriker}>NonStriker</PlayerList>)}
          </div>
        </div>
        
        <Bowler getPlayerDetailsById={getPlayerDetailsById} 
                allPlayers={allPlayers} bowler={bowler} 
                bowlingTeamPlayers={bowlingTeamPlayers}
                setBowler={setBowler}
                lastOverBowler={lastOverBowler}>
        </Bowler>
        <BallType setballType={setballType}></BallType>
        <Wicket updateWicket={setWicket} striker={striker} nonStriker={nonStriker} bowler={bowler} bowlingTeam={bowlingTeamPlayers}></Wicket>
        {!['caught','stump','bowled','lbw','hitwicket'].includes(wicket?.wicketType)?(
        <Runs setRunType={setRunType} setRuns={setRuns} runs={runs} runType={runType}></Runs>
        ):""}
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary" type="button" onClick={addBall}>Add Ball</button>
        </div>
      </div>
      <div className='col-md-6'>
        {over}.{ballCount} &nbsp;&nbsp;&nbsp;&nbsp; {totalruns}/{outbatsmen.length}
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  return {
    inningsId: getCurrentInningsId(state),
    battingTeamPlayers: getCurrrentInningsBattingTeam(state),
    bowlingTeamPlayers: getCurrrentInningsBowlingTeam(state),
    // striker: Number(getStriker(state)),
    // nonStriker: Number(getNonStriker(state)),
    allPlayers: getAllPlayers(state)
  }
}
function mapDispatchToProps(dispatch) {
  return {
    // selectStriker: (player) => {
    //   dispatch({ type: 'UPDATE_STRIKER', payload: player })
    // },
    // selectNonStriker: (player) => {
    //   dispatch({ type: 'UPDATE_NONSTRIKER', payload: player })
    // },
    // swapStrikers: (striker, nonStriker) => {
    //   console.log('swapStrikers called')
    //   dispatch({ type: 'SWAP_STRIKERS', payload: nonStriker })
      
    // },
    addNewBall: (match,newBall,inningsId,striker,nonStriker) => {
      dispatch(addBallToMatch(match,newBall,inningsId,striker,nonStriker))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Innings)