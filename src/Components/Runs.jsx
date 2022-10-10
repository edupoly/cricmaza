import React from 'react'

function Runs({setRunType,setRuns,runType,runs}) {
  return (
    <div>
      <div className='input-group mb-2'>
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">Run Type</span>
        </div>
        <div className='form-control'>
          <input type="radio" name='runtype' className='p-2' onChange={()=>{setRuns(0);setRunType(null)}}/>:no-run
          <input type="radio" name='runtype' className='p-2' onChange={()=>{setRunType('normal')}}/>:normal
          <input type="radio" name='runtype' className='p-2' onChange={()=>{setRunType('lb')}}/>:lbs
          <input type="radio" name='runtype' className='p-2' onChange={()=>{setRunType('byes')}}/>:byes
        </div>
        {
          runType && (
            <div className='form-control'>
              <input type="radio" name='runtype' className='p-2' onChange={()=>{setRuns(1)}}/>:1 &nbsp;&nbsp;&nbsp;
              <input type="radio" name='runtype' className='p-2' onChange={()=>{setRuns(2)}}/>:2 &nbsp;&nbsp;&nbsp;
              <input type="radio" name='runtype' className='p-2' onChange={()=>{setRuns(3)}}/>:3 &nbsp;&nbsp;&nbsp;
              <input type="radio" name='runtype' className='p-2' onChange={()=>{setRuns(4)}}/>:4 &nbsp;&nbsp;&nbsp;
              <input type="radio" name='runtype' className='p-2' onChange={()=>{setRuns(5)}}/>:5 &nbsp;&nbsp;&nbsp;
              <input type="radio" name='runtype' className='p-2' onChange={()=>{setRuns(6)}}/>:6
            </div>
          )
        }
        {runs!=null && (<div className="input-group-append">
          <span className="input-group-text">{runs}</span>
        </div>)}
        
      </div>
    </div>
  )
}

export default Runs