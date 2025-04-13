'use client';
import { useEffect, useState } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(false); // Add loading state
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery'));
        if (!delivery) {
            router.push('/deliverypartner');
        } else {
            getMyOrders(delivery._id);
        }
    }, []);

    const getMyOrders = async (id) => {
        setLoading(true); // Set loading to true before the API call
        try {
            let response = await fetch(`http://localhost:3000/api/deliverypartners/orders/${id}`);
            response = await response.json();
            if (response.success) {
                setMyOrders(response.result);
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError("Error fetching orders: " + error.message);
        } finally {
            setLoading(false); // Set loading to false after the API call
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        setLoading(true); // Set loading to true before the API call
        try {
            let response = await fetch(`http://localhost:3000/api/deliverypartners/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            response = await response.json();
            if (response.success) {
                // Update the status in the local state
                setMyOrders((prevOrders) => 
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError("Error updating status: " + error.message);
        } finally {
            setLoading(false); // Set loading to false after the API call
        }
    };

    const handleStatusChange = (orderId, event) => {
        const newStatus = event.target.value;
        updateOrderStatus(orderId, newStatus);
    };

    return (
        <div>
            <DeliveryHeader />
            <h1>My Order List</h1>
            {loading && <p>Loading...</p>} {/* Display loading message */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            {myOrders.map((item) => (
                <div className="restaurant-wrapper" key={item._id}>
                    <h4>Name: {item.data.name}</h4>
                    <div>Amount: {item.amount}</div>
                    <div>Address: {item.data.address}</div>
                    <div>Status: {item.status}</div>
                    <div>Update Status:
                        <select defaultValue={item.status} onChange={(e) => handleStatusChange(item._id, e)}>
                            <option value="Confirm">Confirm</option>
                            <option value="On the way">On the way</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Failed to deliver">Failed to deliver</option>
                        </select>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Page;
