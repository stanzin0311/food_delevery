import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        loadFoodItems();
    }, []);

    const loadFoodItems = async () => {
        const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'));

        if (!restaurantData || !restaurantData._id) {
            alert("Restaurant data not found in local storage");
            setIsLoading(false);
            return;
        }

        const resto_id = restaurantData._id;
        console.log("Resto ID:", resto_id); // Log resto_id for debugging

        try {
            let response = await fetch(`http://localhost:3000/api/restaurant/foods/${resto_id}`);
            const data = await response.json();
            if (data.success) {
                setFoodItems(data.result);
            } else {
                alert("Food item list not loading");
            }
        } catch (error) {
            console.error("Error loading food items:", error);
            alert("Failed to load food items");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteFoodItem = async (id) => {
        try {
            let response = await fetch(`http://localhost:3000/api/restaurant/foods/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                loadFoodItems();
            } else {
                alert("Food item not deleted");
            }
        } catch (error) {
            console.error("Error deleting food item:", error);
            alert("Failed to delete food item");
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Food Items</h1>
            <table>
                <thead>
                    <tr>
                        <td>S.N</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody>
                    {foodItems.length > 0 ? (
                        foodItems.map((item, key) => (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td><img src={item.img_path} alt={item.name} style={{ width: '100px', height: 'auto' }} /></td>
                                <td>
                                    <button onClick={() => deleteFoodItem(item._id)}>Delete</button>
                                    <button onClick={() => router.push(`dashboard/${item._id}`)}>Edit</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No food items found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FoodItemList;
