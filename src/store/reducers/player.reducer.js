var initialState = {
  players:[]
}
function playerReducer(state=initialState,action){
  if(action.type=='INIT_PLAYERS'){
    return {...state,players:[...action.players]}
  }
  if(action.type=='ADD_PLAYERS'){
    return {...state,players:[...state.players,{...action.payload}]}
  }
  return state;
}
export function getPlayerDetailsById({players=[]},id){
  if(players.length!=0){
    return players.find(player=>id===player.id)
  }
  else{
    return null
  }
}
export function getAllPlayers(state){
  return state.players
}

export default playerReducer