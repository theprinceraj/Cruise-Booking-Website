import { React, useState } from 'react'
import Calendar from 'react-calendar';
import '../styles/React_Calendar_Style.css';
import add from '../assets/add.png'
import addfill from '../assets/addfill.png'


export default function CalendarUI() {

    const [isAddHovered, setIsAddHovered] = useState(false);
    const AddHandleMouseEnter = () => setIsAddHovered(true);
    const AddHandleMouseLeave = () => setIsAddHovered(false);
    const addBtnStyle = {
        backgroundImage: isAddHovered ? `url(${addfill})` : `url(${add})`,
        cursor: "pointer",
        width: "50px",
        height: "50px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        marginTop: "10px"
    };

    const [value, onChangeCalender] = useState(new Date());
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const buttonStyle = {
        borderColor: "#008888",
        borderWidth: "1px",
        color: isHovered ? "darkblue" : "cyan",
        backgroundColor: isHovered ? "cyan" : "transparent",
        width: "40%",

        fontSize: "150%",
        fontFamily: "fantasy",
        borderRadius: "5px"
    };


    let passengerSchema = {
        name: "",
        age: 0,
    };

    const [serviceList, setserviceList] = useState([passengerSchema,]);

    const handleAddService = () => {
        setserviceList([...serviceList, passengerSchema]);
    }


    const handleRemoveService = (index) => {
        const list = [...serviceList];
        // list.splice(index, 1);
        list.pop()
        setserviceList(list);
    }

    const handleServiceChanges = (e, index) => {
        const { name, value } = e.target;

        const list = [...serviceList];
        list[index][name] = value;

        // console.log(`${name} : ${value} in index : ${index}`);
        setserviceList(list);
    }

    const setData = () => {
        const dateformat = `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
        // dateformat = dd/mm/yyyy
        
        let count = 0;
        for (let i = 0; i < serviceList.length; i++) {
            if (serviceList[i]["name"].trim() == "") {
                alert("Name field is empty!");
                break
            }
            else if (serviceList[i]["age"] < 0) {
                alert("Age cannot be negative!")
                break
            }
            else {
                console.log(`Name: ${serviceList[i].name}, Age: ${serviceList[i].age}`);
                count++;
            }
        }
        if (count != 0) {
            console.log((count>1)? `Passengers : ${count}`:`Passenger : ${count}`);
            console.log(dateformat);
        }
        
        
    }

    return (
        <>

            <div className='flex justify-center align-center ' style={{ margin: "60px" }}>
                <div className='flex second-container ' style={{ justifyContent: "center", width: "40%", height: "auto" }} >
                    <div style={{ margin: "20px" }}>
                        <h1 className='dateselection'> Select Your Date</h1>
                        <br />
                        <div className='flex container' style={{ width: "100%", justifyContent: "center" }}>
                            <Calendar
                                onChange={onChangeCalender}
                                value={value}

                            />
                        </div>

                        <div style={{ marginTop: "20px" }}>

                            <form className='form' autoComplete='on' >
                                <div className='formfield'>
                                    <div style={{ fontSize: "20px" }}>Passenger Details</div>
                                    <div className='services services-container'>

                                        {serviceList.map((singleService, index) => (
                                            <div key={index} className='input-field' >
                                                <label htmlFor={`name`}></label>
                                                <input type="text" name={`name`} id={`name`} className='inputstyle inputstyle-name' placeholder='Enter your name'
                                                    onChange={(e) => { handleServiceChanges(e, index) }}

                                                />

                                                <label htmlFor={`age`}></label>
                                                <input type="number" name={`age`} id={`age`} className='inputstyle inputstyle-age' placeholder='Enter your age'
                                                    min="0"
                                                    onChange={(e) => { handleServiceChanges(e, index) }}
                                                />

                                                {serviceList.length > 1 && <button type='button' className='removebtn' id={`remove-btn${index}`}
                                                    onClick={() => handleRemoveService(index)}>
                                                    Remove
                                                </button>}


                                            </div>
                                        ))}


                                        <div className='add-input-field' style={addBtnStyle}
                                            onMouseEnter={AddHandleMouseEnter}
                                            onMouseLeave={AddHandleMouseLeave}
                                            onClick={handleAddService} />


                                    </div>

                                </div>


                            </form>




                        </div>

                        <div style={{
                            marginTop: "50px", width: "100%",
                            display: "flex", justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <button
                                className=" orderbtn"
                                style={buttonStyle}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={setData}

                            > BOOK NOW

                            </button>

                        </div>


                    </div>

                </div>

            </div>


        </>
    )
}
