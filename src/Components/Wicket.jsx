import React,{useState} from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllPlayers, getPlayerDetailsById } from '../store/reducers/player.reducer';
import PlayerList from './PlayerList';

function Wicket({allPlayers,striker,nonStriker,bowlingTeam,bowler}) {
  const feilderWicketTypes = ['caught', 'stump', 'runout', 'obstruction']
  const allWicketTypes = ['bowled', 'lbw', 'hitwicket', ...feilderWicketTypes];
  const [wicket, setWicket] = useState({
    wicketType: 'nowicket',
    outbatsman: null,
    bowler: null,
    fielder: null
  })
  useEffect(()=>{
    if(['caught','stump','bowled','lbw','hitwicket'].includes(wicket.wicketType)){
      setWicket({...wicket,bowler:bowler})
      if(!['caught','stump'].includes(wicket.wicketType)){
        setWicket({...wicket,fielder:null})
      }
    }
    else{
      setWicket({...wicket,bowler:null})
    }
  },[wicket.wicketType])
  
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
              {allWicketTypes.map((wt) => {
                return (<option value={wt}>{wt}</option>)
              })}
            </select>
          </div>
          
          {
            feilderWicketTypes.includes(wicket.wicketType) && (
              <div className='form-control'>
              
                <input type="radio" name='outbatsman' value={striker} className='p-2' onChange={(e) => { setWicket({ ...wicket, outbatsman: e.target.value }) }} />:{getPlayerDetailsById(allPlayers,striker) && getPlayerDetailsById(allPlayers,striker).fullname} &nbsp;&nbsp;&nbsp;
                <input type="radio" name='outbatsman' value={nonStriker} className='p-2' onChange={(e) => { setWicket({ ...wicket, outbatsman: e.target.value }) }} />:{getPlayerDetailsById(allPlayers,nonStriker) && getPlayerDetailsById(allPlayers,nonStriker).fullname} &nbsp;&nbsp;&nbsp;
              </div>
            )
          }
          
          <div className='form-control'>
            <PlayerList players={bowlingTeam} selectPlayer={(fielder)=>{setWicket({...wicket,fielder:fielder})}}>Select Fielder</PlayerList>
          </div>
          <div class="input-group-append">
            <span class="input-group-text">{JSON.stringify(wicket)}</span>
          </div>
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