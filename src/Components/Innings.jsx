import React, { useState } from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux'
import { getCurrentInningsId, getCurrrentInningsBattingTeam, getCurrrentInningsBowlingTeam, getNonStriker, getStriker } from '../store/reducers/match.reducer'
import { getAllPlayers, getPlayerDetailsById } from '../store/reducers/player.reducer';
import BallType from './BallType'
import PlayerList from './PlayerList'
import Runs from './Runs'
import Wicket from './Wicket'
function Innings({ addBall, allPlayers, inningsId, battingTeamPlayers, bowlingTeamPlayers, striker = null, selectStriker, nonStriker = null, selectNonStriker, swapStrikers }) {
  const [ballType, setballType] = useState(null);
  const [runType, setRunType] = useState(null);
  const [runs, setRuns] = useState(null)
  const [bowler, setBowler] = useState(null);
  const [lastOverBowler, setLastOverBowler] = useState(null)
  const [wicket, setWicket] = useState(null)
  const [newball, setNewball] = useState({
    bowler: null,
    ballType: null,
    runs: null,
    wicket: null,
    outBatsmen: []
  })
  function getPlayerName() {
    if (striker && allPlayers) {
      return getPlayerDetailsById(allPlayers, striker).fullname;
    }
  }
  useEffect(() => {
    // console.log("innings::",wicket)
  }, [wicket])
  useEffect(() => {
    console.log(striker, nonStriker, bowler, ballType, runs, runType, wicket)
  })
  function addBall() {
    var outBatsmen = []
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

    if (runType === 'normal') {
      ballruns.batsmanruns = runs;
    }
    else {
      extras.extraruntype = runType;
      extras.runs = runs;
      ballruns.extraruns.push({ ...extras })
    }

    if (wicket) {
      outBatsmen.push(wicket.outbatsman)
    }
    setNewball({
      bowler,
      ballType,
      runs: { ...ballruns },
      wicket,
      outBatsmen: [...outBatsmen]
    })
  }
  return (
    <div className='border border-2 p-2'>
      <div className='d-flex justify-content-between text-center m-2'>
        <div className='input-group w-25'>
          <div className='input-group-prepend'>
            <div className='input-group-text'>Striker:</div>
          </div>
          <div className='form-control'>
            {getPlayerName()}{!striker && (<PlayerList players={battingTeamPlayers} disablePlayers={[13, 16, nonStriker]} selectPlayer={selectStriker}></PlayerList>)}
          </div>
          <div className='input-group-append'>
            <div className='input-group-text'>{striker && (<span onClick={() => { selectStriker(null) }}>Change</span>)}</div>
          </div>
        </div>
        <div className=' w-20'>
          <button className="btn btn-primary" onClick={() => { swapStrikers(striker, nonStriker) }}>Swap</button>
        </div>
        <div className='input-group w-25'>
          <div className='input-group-prepend'>
            <div className='input-group-text'>NonStriker:</div>
          </div>
          <div className='form-control'>
            {getPlayerDetailsById(allPlayers, nonStriker) && getPlayerDetailsById(allPlayers, nonStriker).fullname}
            {!nonStriker && (<PlayerList players={battingTeamPlayers} disablePlayers={[13, 16, striker]} selectPlayer={selectNonStriker}></PlayerList>)}
          </div>
          <div className='input-group-append'>
            <div className='input-group-text'>{nonStriker && (<span onClick={() => { selectNonStriker(null) }}>Change</span>)}</div>
          </div>
        </div>
        
        <div className='input-group w-25'>
          <div className='input-group-prepend'>
            <div className='input-group-text'>Bowler:</div>
          </div>
          <div className='form-control'>
            {getPlayerDetailsById(allPlayers, bowler) && getPlayerDetailsById(allPlayers, bowler).fullname}
            {!bowler && (<PlayerList players={bowlingTeamPlayers} selectPlayer={setBowler} disablePlayers={[lastOverBowler]}></PlayerList>)}
          </div>
          {bowler && (<div className='input-group-append'>
            {bowler}
            <div className='input-group-text'><span onClick={() => { setBowler(null) }}>Change</span></div>
          </div>)}
        </div>
      </div>
      
      

      <BallType setballType={setballType}></BallType>
      <Runs setRunType={setRunType} setRuns={setRuns} runs={runs} runType={runType}></Runs>
      <Wicket updateWicket={setWicket} striker={striker} nonStriker={nonStriker} bowler={bowler} bowlingTeam={bowlingTeamPlayers}></Wicket>
      <div className="d-grid gap-2 col-6 mx-auto">
        <button className="btn btn-primary" type="button" onClick={addBall}>Add Ball</button>
      </div>
      <div className="d-grid gap-2 col-6 mx-auto">
        <i>{JSON.stringify(newball)}</i>
      </div>
    </div>

  )
}
function mapStateToProps(state) {
  return {
    inningsId: getCurrentInningsId(state),
    battingTeamPlayers: getCurrrentInningsBattingTeam(state),
    bowlingTeamPlayers: getCurrrentInningsBowlingTeam(state),
    striker: Number(getStriker(state)),
    nonStriker: Number(getNonStriker(state)),
    allPlayers: getAllPlayers(state)
  }
}
function mapDispatchToProps(dispatch) {
  return {
    selectStriker: (player) => {
      dispatch({ type: 'UPDATE_STRIKER', payload: player })
    },
    selectNonStriker: (player) => {
      dispatch({ type: 'UPDATE_NONSTRIKER', payload: player })
    },
    swapStrikers: (striker, nonStriker) => {
      dispatch({ type: 'UPDATE_STRIKER', payload: nonStriker })
      dispatch({ type: 'UPDATE_NONSTRIKER', payload: striker })
    },
    addBall: (newBall) => {

    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Innings)