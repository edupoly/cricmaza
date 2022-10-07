import {combineReducers} from 'redux';
import matchReducer from "./match.reducer";
import playerReducer from "./player.reducer";
import teamReducer from "./team.reducer";
export default combineReducers({matches:matchReducer,players:playerReducer,teams:teamReducer})