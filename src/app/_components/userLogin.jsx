"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"

const UserLogin = (props) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const router= useRouter();

    console.log("login",props);

    const loginHandle=async()=>{
        let response = await fetch('http://localhost:3000/api/user/login', {
            method: 'post',
            body: JSON.stringify({email, password})
        })
        response = await response.json();
        if (response.success) {
            const {result}=response;
            delete result.password;
            localStorage.setItem('user',JSON.stringify(result));
            router.push('/')

        } else {
            alert("failed to login. Please try again with valid email and password")
        }
    }
    return (
        <div>
            <div className="inputWrapper">
                <input
                    type="text"
                    className="inputField"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter email"
                />
            </div>
            <div className="inputWrapper">
                <input
                    type="password"
                    className="inputField"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                />
            </div>
            <div className="inputWrapper">
                <button onClick={loginHandle} className="button">Login</button>
            </div>
        </div>
    )
}

export default UserLogin;
