var initialState = {
  teams:[]
}
function teamReducer(state=initialState,action){
  if(action.type=='INIT_TEAMS'){
    return {...state,teams:[...action.teams]}
  }
  if(action.type=='ADD_TEAM'){
    return {...state,teams:[...state.teams,{...action.payload}]}
  }
  return state;
}

export function getTeamPlayersById({teams=[]},id){
  if(teams.length!=0){
    var team = teams.find(team=>id==team.id)
    if(team.players.length>=0){
      return team.players
    }
    else{
      return []
    }
  }
}

export default teamReducer