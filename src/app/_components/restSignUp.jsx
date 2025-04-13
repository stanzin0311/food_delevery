"use client"; // Ensure this component runs on the client side
import { useState } from "react";
import { useRouter } from "next/navigation";

const RestSignUp = () => {
    const [restname, setRestName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfpassword] = useState('');
    const [contactNo, setContactNo] = useState('');
    const router = useRouter();

    const handleSignUp = async () => {
        console.log(restname, city, address, email, password, confpassword, contactNo);

        if (password !== confpassword) {
            console.log("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("/api/restaurant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ restname, city, address, email, password, contactNo })
            });

            const result = await response.json();
            console.log(result);

            if (result.success) {
                console.log(result);
                alert("Restaurant Registered");
                const userData = { ...result };
                delete userData.password; // Assuming the password is included in the response object
                localStorage.setItem("restaurantUser", JSON.stringify(userData));
                router.push("restaurent/dashboard");
            } else {
                console.log("Sign-up failed");
            }
        } catch (error) {
            console.error("Error signing up:", error.message);
        }
    }

    return (
        <div className="container">
            <h3>Sign-Up</h3>
            <div className="inputWrapper">
                <div>
                    <input type="text" placeholder="Enter Restaurant name" className="inputField" value={restname} onChange={(event) => setRestName(event.target.value)} />
                </div>
                <div className="inputWrapper">
                    <input type="text" placeholder="Enter City" className="inputField" value={city} onChange={(event) => setCity(event.target.value)} />
                </div>
                <div className="inputWrapper">
                    <input type="text" placeholder="Enter Full address" className="inputField" value={address} onChange={(event) => setAddress(event.target.value)} />
                </div>
                <div className="inputWrapper">
                    <input type="text" placeholder="Enter email id" className="inputField" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="inputWrapper">
                    <input type="password" placeholder="Enter password" className="inputField" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="inputWrapper">
                    <input type="password" placeholder="Confirm password" className="inputField" value={confpassword} onChange={(event) => setConfpassword(event.target.value)} />
                </div>
                <div className="inputWrapper">
                    <input type="text" placeholder="Enter Contact No." className="inputField" value={contactNo} onChange={(event) => setContactNo(event.target.value)} />
                </div>
                <div className="inputWrapper">
                    <button className="button" onClick={handleSignUp}> SignUp</button>
                </div>
            </div>
        </div>
    );
}

export default RestSignUp;
