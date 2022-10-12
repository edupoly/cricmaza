import { getTeamPlayersById } from "./team.reducer";

var initialState = {
  allMatches:[],
  selectedMatch:{},
  currentInnings:0
}
function matchReducer(state=initialState,action){
  if(action.type==='INIT_MATCHES'){
    return {...state,allMatches:[...action.matches]}
  }
  if(action.type==='SELECT_MATCH'){
    return {...state,selectedMatch:action.payload}
  }
  if(action.type==='UPDATE_STRIKER'){
    state.selectedMatch.innings[state.currentInnings].striker=action.payload;
    return{...state}
  }
  if(action.type==='UPDATE_NONSTRIKER'){
    state.selectedMatch.innings[state.currentInnings].nonStriker=action.payload;
    console.log("state.selectedMatch::",state.selectedMatch)
    return{...state}
  }
  
  if(action.type==='SWAP_STRIKERS'){
    var temp = {...state.selectedMatch}
    temp.innings[state.currentInnings].nonStriker=action.payload.striker;
    temp.innings[state.currentInnings].striker=action.payload.nonStriker;
    return{...state,selectedMatch:{...temp}}
  }
  
  if(action.type==='UPDATE_BOWLER'){
    var temp = {...state.selectedMatch}
    temp.innings[action.inningsId].bowler=action.bowler;
    return{...state,selectedMatch:{...temp}}
  }
  if(action.type==='UPDATE_OUTBATSMEN'){
    var temp = {...state.selectedMatch}
    temp.innings[action.inningsId].outBatsmen.push(action.outBatsmen)
    return{...state,selectedMatch:{...temp}}
  }
  
  return state;
}
export function getMatchDetailsById({allMatches},matchId){
  // console.log(allMatches)
  if(allMatches){
    return allMatches?.find(match=>match.id==matchId)
  }
}
export function getCurrentInningsId({matches}){
  return matches.currentInnings
}
export function getCurrrentInningsBattingTeam(state){
  var {matches:{selectedMatch,currentInnings}}=state
  if(selectedMatch.innings){
    return getTeamPlayersById(state.teams,selectedMatch.innings[currentInnings].battingteam)
  }
}
export function getCurrrentInningsBowlingTeam(state){
  var {matches:{selectedMatch,currentInnings}}=state
  if(selectedMatch.innings){
    // console.log("bowlingteam::",getTeamPlayersById(state.teams,selectedMatch.innings[currentInnings].bowlingteam))
    return getTeamPlayersById(state.teams,selectedMatch.innings[currentInnings].bowlingteam)
  }
}
export function getStriker(state){
  var {matches:{selectedMatch,currentInnings}}=state
  // console.log("selectedMatch::",selectedMatch)
  return (selectedMatch.innings && selectedMatch.innings[currentInnings].striker)?selectedMatch.innings[currentInnings].striker:null
}
export function getNonStriker(state){
  var {matches:{selectedMatch,currentInnings}}=state
  return (selectedMatch.innings && selectedMatch.innings[currentInnings].nonStriker)?selectedMatch.innings[currentInnings].nonStriker:null
}
export default matchReducer;