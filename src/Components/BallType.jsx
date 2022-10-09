import React from 'react'

function BallType({setballType}) {
  return (
    <div>
      <div className='input-group mb-2'>
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">BallType</span>
        </div>
        <div className='form-control'>
          <input type="radio" name='balltype' className='p-2' onChange={()=>{setballType('normal')}}/>:normal
          <input type="radio" name='balltype' className='p-2' onChange={()=>{setballType('wide')}}/>:wide
          <input type="radio" name='balltype' className='p-2' onChange={()=>{setballType('noball')}}/>:no-ball
        </div>
      </div>
    </div>
  )
}

export default BallType