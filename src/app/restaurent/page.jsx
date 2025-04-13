// pages/restaurant.js
'use client'
import './page.css';
import { useState } from 'react';
import RestLogin from '../_components/restLogin';
import RestSignUp from '../_components/restSignUp';
import RestHeader from '../_components/restHeader';
import RestFooter from '../_components/restFooter';
const Restaurant = () => {
    const [login,setLogin] = useState(true);

   
    return (
        <div className='restPage'>
        <RestHeader/>
            <h1>Restaurant Login/Signup Page</h1>
           
           {
            login?<RestLogin />:<RestSignUp />
           } 
            <div >
            <button onClick={()=>setLogin(!login)} className='toggle'>
            {login?"Donot have an account ? SignUp":"Already have an account ?"}
            </button>
            </div>
            {/* Optionally include signup component */}
            {/* <RestSignUp /> */}
            <RestFooter/>
        </div>
    );
}

export default Restaurant;
