'use client'
import { useEffect, useState } from "react";
import DeliveryHeader from "../_components/deliveryHeader";
import { useRouter } from "next/navigation";

const Page = () => {
    const [loginMobile, setLoginMobile] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const router = useRouter();


    useEffect(()=>{
        const delivery= localStorage.getItem('delivery')&&JSON.parse(localStorage.getItem('delivery'));
        if(delivery){
            router.push('/deliverydashboard')
        }
    },[])

    const handleSignUp = async () => {
        try {
            const requestBody = { name, mobile, password, city, address };
            console.log(requestBody);
    
            const response = await fetch('http://localhost:3000/api/deliverypartners/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
    
            if (!response.ok) {
                throw new Error('Failed to sign up. Please try again.');
            }
    
            const responseData = await response.json();
    
            if (responseData.success) {
                const { result } = responseData;
                const resultWithoutPassword = { ...result, password: undefined };
                localStorage.setItem('delivery', JSON.stringify(resultWithoutPassword));
                router.push('/deliverydashboard');
            } else {
                throw new Error('Failed to sign up. Please try again.');
            }
        } catch (error) {
            console.error('Error signing up:', error.message);
            alert('Failed to sign up. Please try again.');
        }
    };
    

    const loginHandle = async () => {
    
    
        try {
            let response = await fetch('http://localhost:3000/api/deliverypartners/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mobile: loginMobile, password: loginPassword })
            });
    
            if (!response.ok) {
                throw new Error('Failed to login. Please try again.');
            }
    
            const responseData = await response.json();
    
            if (responseData.success) {
                const { result } = responseData;
                const resultWithoutPassword = { ...result, password: undefined }; // Ensure immutability
                localStorage.setItem('delivery', JSON.stringify(resultWithoutPassword));
                router.push('deliverydashboard');
            } else {
                throw new Error('Failed to login. Please try again with valid mobile and password.');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
            <DeliveryHeader />
            <h1>Delivery Partner</h1>
            <div className="auth-container">

                <div className="login-wrapper">
                    <h3>Login</h3>
                    <div className="inputWrapper">
                        <input type="text" placeholder="enter mobile" value={loginMobile} onChange={(event) => setLoginMobile(event.target.value)} className="inputField" />
                    </div>
                    <div className="inputWrapper">
                        <input type="password" placeholder="enter password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} className="inputField" />
                    </div>
                    <div className="inputWrapper">
                        <button onClick={loginHandle} className="button">Login</button>
                    </div>

                </div>
                <div className="signupWrapper">
                    <h3>Signup</h3>
                    <div className="inputWrapper">
                        <input type="text" className="inputField" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter name" />
                    </div>
                    <div className="inputWrapper">
                        <input type="text" className="inputField" value={mobile} onChange={(event) => setMobile(event.target.value)} placeholder="Enter mobile" />
                    </div>

                    <div className="inputWrapper">
                        <input type="text" className="inputField" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" />
                    </div>
                    <div className="inputWrapper">
                        <input type="text" className="inputField" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" />
                    </div>
                    <div className="inputWrapper">
                        <input type="text" className="inputField" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Enter city" />
                    </div>
                    <div className="inputWrapper">
                        <input type="text" className="inputField" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Enter address" />
                    </div>

                    <div className="inputWrapper">
                        <button onClick={handleSignUp} className="button">Signup</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;