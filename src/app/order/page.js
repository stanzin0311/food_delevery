'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/customerHeader";
import RestFooter from "../_components/restFooter";
import { DELIVERY_CHARGES, TAX } from "../lib/const";
import { useRouter } from "next/navigation";

const Page = () => {
    const [userStorage, setUserStorage] = useState(() => {
        try {
            return localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
        } catch (e) {
            return null;
        }
    });
    
    const [cartStorage, setCartStorage] = useState(() => {
        try {
            return localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'));
        } catch (e) {
            return null;
        }
    });

    const [total] = useState(() => {
        if (!cartStorage) return 0;
        return cartStorage.length === 1 ? cartStorage[0].price : cartStorage.reduce((a, b) => {
            return a.price + b.price;
        });
    });

    const [removeCartData, setRemoveCartData] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!total) {
            router.push('/');
        }
    }, [total, router]);

    const orderNow = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const cart = JSON.parse(localStorage.getItem('cart'));
            const city = user.city;
            const user_id = user._id;

            const foodItemIds = cart.map((item) => item._id).toString();
            let deliveryBoyResponse = await fetch(`http://localhost:3000/api/deliverypartners/${city}`);
            deliveryBoyResponse = await deliveryBoyResponse.json();
            const deliveryBoyIds = deliveryBoyResponse.result.map((item) => item._id);

            if (deliveryBoyIds.length === 0) {
                alert("No delivery partner available");
                return;
            }

            const deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];

            const resto_id = cart[0].resto_id;
            const amount = total + DELIVERY_CHARGES + (total * TAX / 100);
            const collection = {
                user_id,
                resto_id,
                foodItemIds,
                deliveryBoy_id,
                status: 'confirm',
                amount
            };

            let response = await fetch('http://localhost:3000/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(collection)
            });
            response = await response.json();

            if (response.success) {
                alert("Order confirmed");
                setRemoveCartData(true);
                router.push('myprofile');
            } else {
                alert("Order failed");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("An error occurred while placing the order. Please try again.");
        }
    };

    return (
        <div>
            <CustomerHeader removeCartData={removeCartData} />
            <div className="total-wrapper">
                <div className="block-1">
                    <h2>User Details</h2>
                    <div className="row">
                        <span>Name: </span>
                        <span>{userStorage?.name}</span>
                    </div>
                    <div className="row">
                        <span>Address: </span>
                        <span>{userStorage?.address}</span>
                    </div>
                    <div className="row">
                        <span>Mobile: </span>
                        <span>{userStorage?.mobile}</span>
                    </div>
                    <h2>Amount Details</h2>
                    <div className="row">
                        <span>Tax: </span>
                        <span>{total * TAX / 100}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges: </span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount: </span>
                        <span>{total + DELIVERY_CHARGES + (total * TAX / 100)}</span>
                    </div>
                    <h2>Payment Methods</h2>
                    <div className="row">
                        <span>Cash on Delivery: </span>
                        <span>{total + DELIVERY_CHARGES + (total * TAX / 100)}</span>
                    </div>
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>Place your Order Now</button>
                </div>
            </div>
            <RestFooter />
        </div>
    );
};

export default Page;
