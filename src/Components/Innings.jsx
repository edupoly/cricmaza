import React, { useState,useEffect } from 'react';
import Playerlist from './Playerlist';
class Wicket{
  wickettype;
  batsman;
  fielder;
}
class Runs{
  batsman;
  isBoundary;
  batsmanruns;
  extraruns;
}
class NewBall {
  constructor(striker,isBoundary,batsmanruns,extraruns,wickettype,wicketbatsman,fielder,bowler,ballType,nonStriker,over,isLeagal) {
    this.runs = new Runs(striker,isBoundary,batsmanruns,extraruns)
    this.wicket = new Wicket(wickettype,wicketbatsman,fielder)
    this.bowler = bowler;
    this.ballType = ballType
    this.striker = striker;
    this.nonStriker = nonStriker;
    this.over=over;
    this.isLeagal=isLeagal;
  }
  runs;
  wicket;
  bowler;
  striker;
  nonstriker;
  balltype;
  over;
  isLeagal;
}

function Innings(props) {
  console.log("innings", props)
  const [ballType, setBallType] = useState(null)
  const [batsmanruns, setBatsmanruns] = useState(null)
  const [extraruns, setExtraruns] = useState(null)
  const [wicket, setWicket] = useState(null)
  const [bowler, setBowler] = useState(null)
  const [striker,setStriker]=useState(null)
  const [nonStriker,setNonStriker]=useState(null)
  const [isBoundary, setIsBoundary] = useState(false);
  const [wickettype, setWickettype] = useState(null)
  const [wicketbatsman, setWicketbatsman] = useState(null)
  const [fielder, setFielder] = useState(null)
  const [runType, setRunType] = useState(null)
  const [outBatsmen, setOutBatsmen] = useState([])
  function addBall() {
    console.log(wicketbatsman)
    if(wicketbatsman){
      setOutBatsmen([...outBatsmen,wicketbatsman])
    }
    var newball = new NewBall(striker,isBoundary,batsmanruns,extraruns,wickettype,wicketbatsman,fielder,bowler,ballType,nonStriker);
    console.log(newball)
  }
  function swapStriking(){
    setStriker(nonStriker)
    setNonStriker(striker);
  }
  function setRun(){}
  useEffect(() => {
    console.log(striker)
  }, [striker])
  useEffect(()=>{},[])
  function getPlayerDetailsById(team,id){
    console.log("getPlayerDetailsById(team,id)",team,id)
    return props.getTeamDetailsById(team).players.find(player=>player.id==id)?.fullname
  }
  useEffect(()=>{
    console.log("wicketbatsman::",wicketbatsman)
    if(wicketbatsman){
      setOutBatsmen([...outBatsmen,wicketbatsman])
    }
  },[wicketbatsman])
  function isOut(batsman){
    console.log(" outBatsmen.includes(batsman)", outBatsmen.includes(batsman))
    return outBatsmen.includes(batsman)
  }
  return (
    <div className='container d-flex flex-wrap p-2 border m-2'>
      <div className='w-50'>
        {
          (striker&&(!isOut(striker)))?(<b>*{getPlayerDetailsById(props.innings.battingteam,striker)}
          <i className='bi bi-pencil-square' onClick={()=>{setStriker(null)}}></i>
          </b>):(<Playerlist outBatsmen={outBatsmen} team={props.innings.battingteam} setStriker={setStriker} getTeamDetailsById={props.getTeamDetailsById}></Playerlist>)
        }
        {
          (nonStriker&&(!isOut(nonStriker)))?(<span>{getPlayerDetailsById(props.innings.battingteam,nonStriker)}
          <i className='bi bi-pencil-square'  onClick={()=>{setNonStriker(null)}}></i>
          </span>):(<Playerlist outBatsmen={outBatsmen}  team={props.innings.battingteam} setNonStriker={setNonStriker} getTeamDetailsById={props.getTeamDetailsById}></Playerlist>)
        }
        <button onClick={swapStriking}>Swap Stike</button>
        <br></br>
        <select onChange={(e)=>{setBowler(e.target.value)}}>
          <option value="null" disabled selected>select the bowler</option>
          {
            props.innings.bowlingteam && props.getTeamDetailsById(props.innings.bowlingteam).players.map((player)=>{
              return(
                <option value={player.id}>{player.fullname}</option>
              )
            })
          }
        </select>
        {/* {JSON.stringify(props.getTeamDetailsById(props.innings.battingteam))} */}
        <div className='input-group m-2'>
          <span className='input-group-text'>Ball Type</span>
          <input type="radio" name='balltype' value='normal' onChange={({target:{value}})=>{setBallType(value)}}/>:normal &nbsp;&nbsp;&nbsp;
          <input type="radio" name='balltype' value='wd' onChange={({target:{value}})=>{setBallType(value)}}/>:wd &nbsp;&nbsp;&nbsp;
          <input type="radio" name='balltype' value='nb' onChange={({target:{value}})=>{setBallType(value)}}/>:nb &nbsp;&nbsp;&nbsp;
        </div>
        
        <div className='input-group m-2'>
          <span className='input-group-text'>Run Type</span>
          <input type="radio" name='runtype' value='norun' onChange={({target:{value}})=>{setRunType(value);setRun(0)}}/>:no run &nbsp;&nbsp;&nbsp;
          <input type="radio" name='runtype' value='normalrun' onChange={({target:{value}})=>{setRunType(value)}}/>:Normal &nbsp;&nbsp;&nbsp;
          <input type="radio" name='runtype' value='byes' onChange={({target:{value}})=>{setRunType(value)}}/>:Byes &nbsp;&nbsp;&nbsp;
          <input type="radio" name='runtype' value='legbyes' onChange={({target:{value}})=>{setRunType(value)}}/>:legbyes &nbsp;&nbsp;&nbsp;
          {
            runType!='norun' && (
            <span className='input-group-text'>Runs
            {
              [1,2,3,4,5,6].map(r=>(
              <>
                <input type='radio' name='runs' className='input-control' onClick={() => { setRun(r) }} />
                {r}&nbsp;&nbsp;&nbsp;
              </>))
            }
            </span>
            )
          }
        </div>
        
        <div className='input-group m-2'>
          <span className='input-group-text'>Wicket Type</span>
          
            <input type='radio' name='wicketType' className='input-control' onClick={() => { setWickettype('B');setWicketbatsman(striker); }} />
            B &nbsp;&nbsp;&nbsp;
            <input type='radio' name='wicketType' className='input-control' onClick={() => { setWickettype('C');setWicketbatsman(striker); }} />
            C &nbsp;&nbsp;&nbsp;
            <input type='radio' name='wicketType' className='input-control' onClick={() => { setWickettype('St');setWicketbatsman(striker); }} />
            St &nbsp;&nbsp;&nbsp;
            <input type='radio' name='wicketType' className='input-control' onClick={() => { setWickettype('R') }} />
            R &nbsp;&nbsp;&nbsp;
            <input type='radio' name='wicketType' className='input-control' onClick={() => { setWickettype('LBW');setWicketbatsman(striker); }} />
            LBW &nbsp;&nbsp;&nbsp;
            <input type='radio' name='wicketType' className='input-control' onClick={() => { setWickettype('OBS') }} />
            OBS &nbsp;&nbsp;&nbsp;
            {
               (wickettype==='R' || wickettype==='OBS') && (
                <>
                  <>
                    <input type="radio" value={striker} onChange={()=>{setWicketbatsman(striker)}}/> {getPlayerDetailsById(props.innings.battingteam,striker)} &nbsp;&nbsp;&nbsp;
                    <input type="radio" value={nonStriker} onChange={()=>{setWicketbatsman(nonStriker)}}/> {getPlayerDetailsById(props.innings.battingteam,nonStriker)} &nbsp;&nbsp;&nbsp;
                  </>
                  <>

                  </>
                </>
              )
            }
            {
              (wickettype==='St' || wickettype==='C' || wickettype==='R' || wickettype==='OBS') && (
                <Playerlist team={props.innings.bowlingteam} 
                  getTeamDetailsById={props.getTeamDetailsById} setFielder={setFielder}>
                </Playerlist>
              )
            }
        </div>
        
        <button className='btn btn-lg btn-success' onClick={addBall}>Add Ball</button>
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