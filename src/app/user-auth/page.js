'use client'
import { useState } from "react"
import CustomerHeader from "../_components/customerHeader"
import RestFooter from "../_components/restFooter"
import UserLogin from "../_components/userLogin"
import UserSignUp from "../_components/userSignUp"

const UserAuth=()=>{
    const [login,setLogin] = useState(true)
    return (
        <div className="container">
        <CustomerHeader/>
            <h1>User</h1>
            {
                login?<UserLogin/>:<UserSignUp />
               } 
                <div >
                <button onClick={()=>setLogin(!login)} className='toggle'>
                {login?"Donot have an account ? SignUp":"Already have an account ?"}
                </button>
                </div>
            <RestFooter/>
        </div>
    )
}

export default UserAuth