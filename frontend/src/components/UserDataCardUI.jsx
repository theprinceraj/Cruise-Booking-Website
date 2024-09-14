import React from 'react'

export default function UserDataCardUI(props) {

  // const arrayOfPassengerDetails = props.passengerDetails;
  // console.log(arrayOfPassengerDetails);
  // console.log("object : ",{  // check this console when fetching is done of the user order history
  //   bookingDate: props.bookingDate ,
  //   passengerDetails:props.passengerDetails ,
  //   foodDetails:props.foodLists,
  //    numberOfPassengers: props.numberOfPassengers ,
  //     totalCost: props.totalCost ,
  //    paymentStatus:props.paymentStatus 
  // });



  return (
    <>
      <div className='userdata h-[10%] w-[96%]  container-bordershadow m-2' >
        <div>
          {props.bookingDate}
        </div>
        <div>
          {props.numberOfPassengers}
        </div>
        <div>
          {props.totalCost}
        </div>
        <div>
          {props.paymentStatus}
        </div>
      </div>
    </>
  )
}