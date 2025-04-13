"use client";
import RestHeader from "@/app/_components/restHeader";
import './../page.css';
import AddFoodItems from "@/app/_components/addFoodItem";
import { useState } from "react";
import FoodItemList from "@/app/_components/foodItemList";

const Dashboard = () => {
    const [addItem, setAddItem] = useState(false);

    const handleAddFoodClick = () => setAddItem(true);
    const handleDashboardClick = () => setAddItem(false);

    return (
        <div>
            <RestHeader />
            <div className="dashboard-buttons">
                <button onClick={handleAddFoodClick}>Add Food</button>
                <button onClick={handleDashboardClick}>Dashboard</button>
            </div>
            {addItem ? <AddFoodItems setAddItem={setAddItem} /> : <FoodItemList />}
        </div>
    );
};

export default Dashboard;
