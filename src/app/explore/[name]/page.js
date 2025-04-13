"use client";
import CustomerHeader from "@/app/_components/customerHeader";
import { useEffect, useState } from "react";

const Page = (props) => {
  const name = props.params.name;
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState();
  const [cartStroage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const [cartIds, setCartIds] = useState(cartStroage?() =>
    cartStroage.map((item) => {
      return item._id;
    }):[]
  );
  const[removeCartData,setRemoveCartData]= useState()
  useEffect(() => {
    loadRestaurantDetails();
  }, []);
  console.log(cartIds);

  const loadRestaurantDetails = async () => {
    const id = props.searchParams.id;
    let response = await fetch("http://localhost:3000/api/customer/" + id);
    response = await response.json();
    if (response.success) {
      setRestaurantDetails(response.details);
      setFoodItems(response.foodItems);
    }
  };
  const addToCart = (item) => {
    setCartData(item);
    let localCartIds=cartIds
    localCartIds.push(item._id)
    setCartIds(localCartIds)
    setRemoveCartData();
  };
  const removeFromChart = (id)=>{
    setRemoveCartData(id);
    var localIds=cartIds.filter(item=>item!=id);
    setCartIds(localIds)
    setCartData();

  }

  return (
    <div>
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className="restaurant-page-banner">
        <h1>{decodeURI(name)}</h1>
      </div>
      <div className="details-wrapper">
        <h4>Contact : {restaurantDetails?.contactNo}</h4>
        <h4>City:{restaurantDetails?.city}</h4>
        <h4>Address:{restaurantDetails?.address}</h4>
        <h4>Email:{restaurantDetails?.email}</h4>
      </div>
      <div className="food-list-wrapper">
        {foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div className="list-item">
              <div>
                <img style={{ width: 100 }} src={item.img_path} />
              </div>

              <div>
                <div>{item.name}</div>
                <div>{item.price}</div>
                <div className="description">{item.description}</div>
                {cartIds.includes(item._id) ? (
                  <button onClick={() => removeFromChart(item._id)}>
                    Remove From Cart
                  </button>
                ) : (
                  <button onClick={() => addToCart(item)}>Add to Cart</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1>No Food Items for this Restaurant</h1>
        )}
      </div>
    </div>
  );
};

export default Page;
