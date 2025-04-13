'use client'
import Image from "next/image";
import styles from "./page.module.css";
import CustomerHeader from "./_components/customerHeader";
import RestFooter from "./_components/restFooter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadLocation();
    loadRestaurant();
  }, []);

  const loadLocation = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/customer/locations');
      if (response.ok) {
        const data = await response.json();
        setLocations(data.result);
      } else {
        console.error('Failed to fetch locations:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const loadRestaurant = async (params) => {
    let url = 'http://localhost:3000/api/customer';
    if (params?.location) {
      url += '?location=' + encodeURIComponent(params.location);
    } else if (params?.restaurant) {
      url += '?restaurant=' + encodeURIComponent(params.restaurant);
    } 

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setRestaurants(data.result);
        } else {
          console.error('Failed to fetch restaurants:', data.message);
        }
      } else {
        console.error('Failed to fetch restaurants:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowDropdown(false); // Hide dropdown after selection
    loadRestaurant({ location: item });
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  console.log("restaurants:", restaurants);

  return (
    <main>
      <CustomerHeader />
      
      <div className="mainPageBanner">
        <h1>Food Delivery App</h1>
        <div className="inputWrapper">
          <input
            type="text"
            className="selectInput"
            placeholder="Select Place"
            value={selectedLocation}
            onClick={toggleDropdown} // Show dropdown on click
            readOnly
          />
          {showDropdown && (
            <ul className="locationList">
              {locations.map((item, index) => (
                <li key={index} onClick={() => handleListItem(item)}>{item}</li>
              ))}
            </ul>
          )}
          <input
            type="text"
            className="search-input"
            placeholder="Enter food or restaurant"
            onChange={(event)=>loadRestaurant({restaurant:event.target.value})}
          />
        </div>
      </div>
      
      <div className="restaurant-list-container">
        {restaurants.map((item) => (
          <div key={item._id} onClick={() => router.push('explore/' + item.restname + "?id=" + item._id)} className="restaurant-wrapper">
            <div className="heading-wrapper">
              <h3>{item.restname}</h3>
              <h5>Contact: {item.contactNo}</h5>
            </div>
            <div className="address-wrapper">
              <div>{item.city},</div>
              <div className="address"> {item.address}, Email: {item.email}</div>
            </div>
          </div>
        ))}
      </div>
      
      <RestFooter />
    </main>
  );
}
