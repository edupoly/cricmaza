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
              {
                [1,2,3,4,5,6].map((r)=>{
                  return(
                    <>
                      <input type="radio" name='runs' className='p-2' onChange={()=>{setRuns(r)}}/>:{r} &nbsp;&nbsp;&nbsp;
                    </>
                  )
                })
              }
              
              
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