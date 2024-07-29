import { React, useState } from 'react'
import Calendar from 'react-calendar';
import '../styles/React_Calendar_Style.css';

export default function CalendarUI() {
    const [value, onChange] = useState(new Date());
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const buttonStyle = {
        borderColor: "#008888",
        borderWidth:"1px",
        color: "cyan",
        backgroundColor: isHovered? "#007777": "transparent" ,
        width: "20%",
        marginTop:"20px",
        fontSize:"130%",
        fontFamily:"fantasy",
        borderRadius:"5px"
    };


    
    const setDate=()=>{
        const dateformat = `${value.getDate()}/${value.getMonth()+1}/${value.getFullYear()}`;
        // dateformat = dd/mm/yyyy
        console.log(dateformat);
    }
     
    

    return (
        <>

            <div className='flex justify-center align-center ' style={{ margin: "60px" }}>
                <div className='flex second-container ' style={{ justifyContent: "center" , width:"35%" }} >
                    <div style={{ margin: "20px" }}>
                        <h1 className='dateselection'> Select Your Date</h1>
                        <br />
                        <div className='flex container'>
                            <Calendar
                                onChange={onChange}
                                value={value}

                            />
                        </div>

                        <button
                            className=" orderbtn"
                            style={buttonStyle} 
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={setDate}
                            
                        > BOOK NOW

                        </button>

                    </div>

                </div>

            </div>


        </>
    )
}
