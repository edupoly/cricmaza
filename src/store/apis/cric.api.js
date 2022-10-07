import axios from 'axios'
export function fetchMatches(){
  return axios.get("http://localhost:4000/matches")
}
export function fetchPlayers(){
  return axios.get("http://localhost:4000/players")
}
export function fetchTeams(){
  return axios.get("http://localhost:4000/teams")
}