import { render } from '@testing-library/react';
import React, { useState } from 'react';
import './AddRoom.css';
import { useNavigate } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import { Rating, Typography } from '@mui/material';

// https://hirukarunathilaka.medium.com/signup-form-with-real-time-validation-using-react-typescript-6a7dfb3122b5

export const AddRoom  = (props:any) =>{
const [resData, setResData] = useState({type: "SMALL", staffOnly: 0});
const navigate = useNavigate();


  let handleChange = (event : any) => {
    event.preventDefault();
    let obj: any = {};
    obj[event.target.name] = event.target.value;
    setResData((prevState)=>{return {...prevState, ...obj}})
    
  }
  let handleChangeStaffOnly = (event : any) => {
    event.preventDefault();
    let obj: any = {};
    obj[event.target.name] = parseInt(event.target.value);
    setResData((prevState)=>{return {...prevState, ...obj}})
    
  }

  let handleSubmit = async (event : any) => {
    event.preventDefault();
    console.log(resData);
    //console.log(resData['type']);
    console.log(JSON.stringify(resData)) ;
    let reqBody: any = resData;
    const roomType:string = resData['type'].toString().toLowerCase();
 
    const response = await fetch(`http://localhost:8080/api/rooms/${roomType}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(resData),
      mode: 'cors'
  });

  if(response.ok){
    console.log(await response.text());
    alert("Room Added Successfully");
  }
  else{
    alert("API call failed. Please try again later");
  }
 
  }

  return (
    <div>
            < NavBar />
      <div className='wrapper'>
              
        <div className='form-wrapper-feedback'>
           <h2>Add Room</h2>
           
           <form onSubmit={handleSubmit} noValidate >
              <div className='type'>
                 <label htmlFor="type">Room Type</label>
                 <select name="type" onChange={handleChange}>
                  <option value="SMALL">SMALL</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LARGE">LARGE</option>
                </select>
              </div>
              <div className='capacity'>
                 <label htmlFor="capacity">Capacity</label>
                 <input type='number' name='capacity' onBlur={handleChange}/>
              </div>
              <div className='floor'>
                 <label htmlFor="floor">Floor</label>
                 <input type='number' name='floor' onBlur={handleChange}/>
              </div>  
              <div className='building'>
                 <label htmlFor="building">Building</label>
                 <input type='text' name='building' onBlur={handleChange}/>
              </div> 
              <div className='type'>
                 <label htmlFor="staffOnly">Staff Only Room?</label>
                 <select name="staffOnly" onChange={handleChangeStaffOnly}>
                  <option value={0}>NO</option>
                  <option value={1}>YES</option>
                </select>
              </div> 
              
              <div className='submit'>
                 <button>Add Room</button>
              </div>
              
         </form>
        
     </div>
     
  </div>
 
  </div>
  );
}


export default AddRoom;

