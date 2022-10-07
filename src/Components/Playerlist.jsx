import React from 'react'

function Playerlist(props) {
  console.clear();
  console.log(props)
  return (
    <>
    {
      props.setStriker && (<select onChange={(e)=>{props.setStriker(e.target.value)}}>
      <option value="null" disabled selected>select the striker</option>
      {
        props.team && props.getTeamDetailsById(props.team).players.map((player)=>{
          return(
            <option value={player.id} disabled={props.outBatsmen && props.outBatsmen.includes(player.id)}>{player.fullname}</option>
          )
        })
      }
    </select>)
    }
    {
      props.setNonStriker && (<select onChange={(e)=>{props.setNonStriker(e.target.value)}}>
      <option value="null" disabled selected>select the Non-Striker</option>
      {
        props.team && props.getTeamDetailsById(props.team).players.map((player)=>{
          return(
            <option value={player.id} disabled={props.outBatsmen?.includes(player.id)}>{player.fullname}</option>
          )
        })
      }
    </select>)
    }
    {
      props.setFielder && (<select onChange={(e)=>{props.setFielder(e.target.value)}}>
      <option value="null" disabled selected>select the Fielder</option>
      {
        props.team && props.getTeamDetailsById(props.team).players.map((player)=>{
          return(
            <option value={player.id}>{player.fullname}</option>
          )
        })
      }
    </select>)
    }
    </>
  )
}

export default Playerlist