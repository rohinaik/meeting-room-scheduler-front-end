import React, {useState} from 'react';
import './Signin.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// https://hirukarunathilaka.medium.com/signup-form-with-real-time-validation-using-react-typescript-6a7dfb3122b5

export const Signin  = (props:any) =>{
const [resData, setResData] = useState({loggedIn: 0, balance: 0, type: "STUDENT"});
const navigate = useNavigate();


  let handleChange = (event : any) => {
    event.preventDefault();
    let obj: any = {};
    obj[event.target.name] = event.target.value;
    setResData((prevState)=>{return {...prevState, ...obj}})
    
  }

  let handleSubmit = async (event : any) => {
    event.preventDefault();
    console.log(JSON.stringify(resData)) ;
    let reqBody: any = resData;
 
    const response = await fetch('http://localhost:8080/api/users/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(resData),
      mode: 'cors'
  });

  
  if(response.ok){
    if (await response.text() == "\"SUCCESS\"")
    {
      console.log("Signup Successful");
      alert("User Registered Successfully! Please Login");
      navigate('/');
    }
    else{
      console.log("User Already exists! \n Please Try again with correct data");
      alert("User Already exists! Try again with correct data");
      navigate('/signin');
    }
  } else {
    console.log("Sign API call failed" + response.statusText);
    alert("Unable to register user /n Please try again later.");
    navigate('/signin');
  }  
  }

  return (
      <div className='wrapper'>
        <div className='form-wrapper'>
           <h2>Sign Up</h2>
           <form onSubmit={handleSubmit} noValidate >
              <div className='type'>
                 <label htmlFor="type">User Type</label>
                 <select name="type" onChange={handleChange}>
                  <option value="STUDENT">STUDENT</option>
                  <option value="STAFF">STAFF</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <div className='name'>
                 <label htmlFor="name">Full Name</label>
                 <input  type='text' name='name' onBlur={handleChange}/>
              </div>
              <div className='email'>
                 <label htmlFor="email">Email</label>
                 <input type='email' name='email' onBlur={handleChange}/>
              </div>
              <div className='password'>
                 <label htmlFor="password">Password</label>
                 <input type='password' name='password' onBlur={handleChange}/>
              </div>              
              <div className='submit'>
                 <button>Register Me</button>
              </div>
              <div>
            </div>
         </form>
         <div className='existingUser'>
                  <button color="secondary" onClick={event => window.location.href = '/'} >Existing User?</button>
         </div>
     </div>
  </div>
  );
}




export default Signin;

