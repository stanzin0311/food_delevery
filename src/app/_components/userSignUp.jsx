"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"

const UserSignUp = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');

    const router = useRouter();

    const handleSignUp = async () => {
        try {
            let response = await fetch("http://localhost:3000/api/user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, city, address, mobile })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let data;
            try {
                data = await response.json();

            } catch (error) {
                throw new Error("Failed to parse JSON response");
            }

            if (data.success) {
                const {result}=data
                delete result.password
                localStorage.setItem('user',JSON.stringify(result));
                router.push('/')
            } else {
                alert("User sign up failed");
            }
        } catch (error) {
            console.error("Error during sign up:", error);
            alert(`Error during sign up: ${error.message}`);
        }
    };

    return (
        <div className="container">
            <div className="inputWrapper">
                <input type="text" className="inputField" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter name" />
            </div>
            <div className="inputWrapper">
                <input type="email" className="inputField" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email" />
            </div>
            <div className="inputWrapper">
                <input type="password" className="inputField" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" />
            </div>
            <div className="inputWrapper">
                <input type="password" className="inputField" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" />
            </div>
            <div className="inputWrapper">
                <input type="text" className="inputField" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Enter city" />
            </div>
            <div className="inputWrapper">
                <input type="text" className="inputField" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Enter address" />
            </div>
            <div className="inputWrapper">
                <input type="text" className="inputField" value={mobile} onChange={(event) => setMobile(event.target.value)} placeholder="Enter mobile" />
            </div>
            <div className="inputWrapper">
                <button onClick={handleSignUp} className="button">Sign Up</button>
            </div>
        </div>
    )
}

export default UserSignUp;
