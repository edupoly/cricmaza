import React, { useState } from 'react';

class NewBall {
  constructor(runs = 0, wicket = 0, bowler = '', striker = '', nonstriker = '', runtype = '', balltype = '', wickettype = '') {
    this.runs = runs
    this.wicket = wicket
    this.bowler = bowler
    this.balltype = balltype
    this.runtype = runtype
    this.wickettype = wickettype
    this.striker = striker;
    this.nonstriker = nonstriker;
  }
  runs;
  wicket;
  bowler;
  striker;
  nonstriker;
  runtype;
  balltype;
  wickettype;
  fielder;
  over;
}

function Innings(props) {
  console.log("innings", props)
  const [ballType, setBallType] = useState(null)
  const [run, setRun] = useState(null)
  const [wicket, setWicket] = useState(null)
  const [striker,setStriker]=useState()
  const [nonstriker,setNonStriker]=useState()
  function addBall() {
    var newball = new NewBall();
    setBallType(newball)
  }

  return (
    <div className='container d-flex flex-wrap p-2 border m-2'>

      <div className='w-50'>
        {/* {JSON.stringify(props.getTeamDetailsById(props.innings.battingteam))} */}
        <div className='input-group m-2'>
          <span className='input-group-text'>Runs</span>
          <button className='input-control' onClick={() => { setRun(0) }}>0</button>
          <button className='input-control' onClick={() => { setRun(1) }}>1</button>
          <button className='input-control' onClick={() => { setRun(2) }}>2</button>
          <button className='input-control' onClick={() => { setRun(3) }}>3</button>
          <button className='input-control' onClick={() => { setRun(4) }}>4</button>
          <button className='input-control' onClick={() => { setRun(5) }}>5</button>
          <button className='input-control' onClick={() => { setRun(6) }}>6</button>
        </div>
        <div className='input-group m-2'>
          <span className='input-group-text'>Ball Type</span>
          <button className='input-control' onClick={() => { setBallType('normal') }}>normal</button>
          <button className='input-control' onClick={() => { setBallType('wd') }}>wd</button>
          <button className='input-control' onClick={() => { setBallType('nb') }}>nb</button>
          <button className='input-control' onClick={() => { setBallType('lb') }}>lb</button>
          <button className='input-control' onClick={() => { setBallType('bye') }}>bye</button>
        </div>
        <div className='input-group m-2'>
          <span className='input-group-text'>Wicket Type</span>
          <button className='input-control' onClick={() => { setWicket('bowled') }}>bowled</button>
          <button className='input-control' onClick={() => { setWicket('caught') }}>caught</button>
          <button className='input-control' onClick={() => { setWicket('stumped') }}>stumped</button>
          <button className='input-control' onClick={() => { setWicket('runout') }}>runout</button>
          <button className='input-control' onClick={() => { setWicket('lbw') }}>lbw</button>
          <button className='input-control' onClick={() => { setWicket('obstruction') }}>obstruction of field</button>
        </div>
        <button className='btn btn-lg btn-success'>Add Ball</button>
      </div>

      <div className='w-50'>
        <h1>Batting Team:{props.getTeamDetailsById(props.innings.battingteam).teamname}</h1>
        <ul>
          {
            props.getTeamDetailsById(props.innings.battingteam).players.map((player) => {
              return <li>{player.fullname}</li>
            })
          }
        </ul>
        <h1>Bowling Team:{props.getTeamDetailsById(props.innings.bowlingteam).teamname}</h1>
        <ul>
          {
            props.getTeamDetailsById(props.innings.bowlingteam).players.map((player) => {
              return <li>{player.fullname}</li>
            })
          }
        </ul>
      </div>

    </div>
  )
}

export default Innings