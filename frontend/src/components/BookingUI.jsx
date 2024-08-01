import {React, useState} from 'react'
import Navbar from './Navbar'
import seasShip from '../assets/seasShip.png';

export default function BookingUI() {

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const buttonStyle = {
        borderColor: "#008888",
        borderWidth:"1px",
        color: "cyan",
        backgroundColor: isHovered? "#004444": "transparent" ,
        height: "55%",
        width: "20%",
        margin: "20px",
        fontSize:"130%",
        fontFamily:"fantasy"
    };

    const packageName = "LENIN CRUISES PACKAGE".toUpperCase().trim()
    const title = "Create memories together".toUpperCase().trim();
    const subTitle = "FAMILY FUN By Ankur".trim();


    return (
        <>
            <div>
                <Navbar />
            </div>

            <div className='flex justify-center items-center ' style={{ margin: "60px" }}>
                <div className='flex second-container  w-[65%] h-[80vh]' style={{ flexDirection: "column", overflow: "hidden" }}>
                    <div>
                        <h1 style={{ color: "white", fontSize: "30px", padding: "10px" }}>
                            {packageName}
                        </h1>
                        <div className='flex ' >
                            <div className='flex w-[100%] h-[60vh]' style={{ overflow: "hidden", }}>
                                <img src={seasShip} alt="CRUISES" style={{ width: "100%" }} />

                            </div>

                        </div>
                    </div>

                    <div className='flex container container-borderbottom h-[100%] ' style={{ justifyContent: "space-between", alignItems:"center" }}>
                        <div className='details' style={{margin:"20px"}}>
                            <div className='title' style={{fontFamily:"monospace", fontSize:"200%"}}>
                                {title}
                            </div>
                            <div className='subtitle' style={{fontFamily:"monospace", fontSize:"140%"}}>
                                {subTitle}
                            </div>

                        </div>

                        <button
                            className=" second-container orderbtn"
                            style={buttonStyle} 
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            
                        > ORDER NOW

                        </button>


                    </div>

                </div>
            </div>
        </>
    )
}
