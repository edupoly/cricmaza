import React,{useState} from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllPlayers, getPlayerDetailsById } from '../store/reducers/player.reducer';
import PlayerList from './PlayerList';

function Wicket({updateWicket,allPlayers,striker,nonStriker,bowlingTeam,bowler}) {
  // console.log("allPlayers,striker,nonStriker,bowlingTeam,bowler",allPlayers,striker,nonStriker,bowlingTeam,bowler)
  const feilderWicketTypes = ['caught', 'stump', 'runout', 'obstruction']
  const allWicketTypes = ['bowled', 'lbw', 'hitwicket', ...feilderWicketTypes];
  const [wicket, setWicket] = useState({
    wicketType: 'nowicket',
    outbatsman: null,
    bowler: null,
    fielder: null
  })
  useEffect(()=>{
    var wickettemp = {
      wicketType: wicket.wicketType,
      outbatsman: null,
      bowler: null,
      fielder: null
    }
    if(['caught','stump','bowled','lbw','hitwicket'].includes(wicket.wicketType)){
      wickettemp={...wickettemp,bowler:bowler,outbatsman:striker}
    } 
    setWicket({...wickettemp})
  },[wicket.wicketType])
  useEffect(()=>{
    updateWicket(wicket)
  },[wicket])
  return (
    <div>
      <div>
        <div className='input-group mb-2'>
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Wicket Type</span>
          </div>
          <div className='form-control'>
            <select onChange={(e) => { setWicket({ ...wicket, wicketType: e.target.value }) }}>
              <option selected>nowicket</option>
              {allWicketTypes.map((wt,i) => {
                return (<option value={wt} key={i}>{wt}</option>)
              })}
            </select>
          </div>
          
          {
            ['runout', 'obstruction'].includes(wicket.wicketType) && (
              <div className='form-control'>
                <input type="radio" name='outbatsman' value={striker} className='p-2' onChange={(e) => { setWicket({ ...wicket, outbatsman: e.target.value }) }} />:{getPlayerDetailsById(allPlayers,striker) && getPlayerDetailsById(allPlayers,striker).fullname} &nbsp;&nbsp;&nbsp;
                <br/>
                <input type="radio" name='outbatsman' value={nonStriker} className='p-2' onChange={(e) => { setWicket({ ...wicket, outbatsman: e.target.value }) }} />:{getPlayerDetailsById(allPlayers,nonStriker) && getPlayerDetailsById(allPlayers,nonStriker).fullname} &nbsp;&nbsp;&nbsp;
              </div>
            )
          }
          {
            feilderWicketTypes.includes(wicket.wicketType) && (
              <div className='form-control'>
                <PlayerList players={bowlingTeam} selectPlayer={(fielder)=>{setWicket({...wicket,fielder:fielder})}}>Select Fielder</PlayerList>
              </div>
            )
          }
{/*           
          <div class="input-group-append">
            <span class="input-group-text">{JSON.stringify(wicket)}</span>
          </div> */}
        </div>
      </div>
    </div>
  )
}
function mapStateToProps(state){
  return {
    allPlayers: getAllPlayers(state)

  }
}
function mapDispatchToProps(){
  return {

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Wicket)