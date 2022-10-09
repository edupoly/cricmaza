import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCurrentInningsId, getMatchDetailsById } from '../store/reducers/match.reducer'
import { getTeamPlayersById } from '../store/reducers/team.reducer'
import Innings from './Innings'

function Match({match,selectMatch,currentInnings}) {
  console.log('props match::',match)
  useEffect(()=>{
    if(match && Object.keys(match).length!==0){
      selectMatch(match)
    }
  },[match])
  return (
    <div className='border border-2 p-2'>
      <Innings></Innings>
    </div>
  )
}
function mapStateToProps(state){
  return {
    match:getMatchDetailsById(state.matches,6),
    currentInnings:getCurrentInningsId(state)
  }

}
function mapDispatchToProps(dispatch){
  return {
    selectMatch:(match)=>{
      dispatch({type:'SELECT_MATCH',payload:match})
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Match)