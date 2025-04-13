import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantLogin = () => {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [error,setError]=useState(false);
    const router= useRouter();

    const handleLogin=async ()=>{
        if(!email || !password){
            setError(true)
            return false
        }else{
            setError(false)
        }
        let  response = await fetch("http://localhost:3000/api/restaurant",{
            method:'POST',
            body:JSON.stringify({email,password,login:true})
        });
        
        response = await response.json();
        if(response.success){
            alert("Login Successful")
            const {result}=response;
            delete result.password;
            localStorage.setItem("restaurantUser",JSON.stringify(result));
            router.push("restaurent/dashboard");
        }else{
            alert("Login failed")
        }

       
    }

    return( <>
        <h3>Login</h3>
        <div className="container">
            <div className="inputWrapper">
                <input className="inputField" type="text" placeholder="Enter email"
                value={email} onChange={(e)=>setEmail(e.target.value)}
                 />
                 {error && !email && <span className="input-error" >Please enter valid email </span>}
            </div>
            <div className="inputWrapper">
                <input className="inputField" type="password" placeholder="Enter password"
                value={password} onChange={(e)=>setPassword(e.target.value)}
                />
                 {error && !password && <span className="input-error" >Please enter valid password </span>}

            
            </div>
            <div className="inputWrapper">
                <button onClick={handleLogin} className="button">Login</button>
            </div>
        </div>
    </>)
}

export default RestaurantLogin;