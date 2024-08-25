import React from 'react'

export default function UserDataCardUI(props) {

  // const arrayOfPassengerDetails = props.passengerDetails;
  // console.log(arrayOfPassengerDetails);

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