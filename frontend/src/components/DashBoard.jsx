import React from 'react'
import Navbar from './Navbar';

function DashBoard() {
  return (
    <>
    <div>
        <Navbar/>
        </div>
        
        <div className="flex items-center justify-center " style={{marginTop:"60px"}}>
            <div className="flex container container-bordershadow w-[65%] h-[80vh] items-center" style={{justifyContent:"space-between"}}>


                <div className=' second-container w-[30%] h-[78vh]' style={{marginInlineStart:"1%",color:"white", fontSize:"20px"}}>
                    <div style={{margin:"10px"}}>
                        Profile
                    </div>

                </div>
                <div className=' second-container w-[66%] h-[78vh]' style={{marginInlineEnd:"1%",color:"white", fontSize:"20px"}}>
                    
                </div>

            </div>

        </div>
    
    </>
  )
}

export default DashBoard;
