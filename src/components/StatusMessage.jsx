import React from 'react'

const StatusMessage = ({winner,current}) => {
    const noMove= current.board.every((el)=>el!==null);
  return (
    <div className='status-message'>{winner && (<>
    Winner is <span className={winner==="X"?"text-green":"text-orange"}>{winner}</span>
    </>)}
    {!winner&&!noMove&&<>Next player is <span className={current.isXNext?"text-green":"text-orange"}>{current.isXNext?"X":"O"}</span></>}
    {!winner&&noMove&&<><span className='text-green'>X</span> and <span className='text-orange'>O</span> are tie</>}
    </div>
  )
}

export default StatusMessage