import logo from './logo.svg';
import './App.css';
import store from './store';
import {Provider} from 'react-redux'
import { useEffect } from 'react';
import { fetchMatches, fetchPlayers,fetchTeams } from './store/apis/cric.api';
import Match from './Components/Match';
function App() {
  useEffect(()=>{
    fetchMatches().then(({data})=>{store.dispatch({type:"INIT_MATCHES",matches:data})}).catch(err=>{throw err})
    fetchPlayers().then(({data})=>{store.dispatch({type:"INIT_PLAYERS",players:data})}).catch(err=>{throw err})
    fetchTeams().then(({data})=>{store.dispatch({type:"INIT_TEAMS",teams:data})}).catch(err=>{throw err})
  },[])
  return (
    <Provider store={store}>
      <div className='container'>
        <i class="bi bi-trophy" style={{fontSize:'40px'}}></i>
        <Match></Match>
      </div>
    </Provider>
  );
}

export default App;
