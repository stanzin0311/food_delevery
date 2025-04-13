'use client';
import { useState, useEffect } from 'react';
import CustomerHeader from '../_components/customerHeader';
import RestFooter from '../_components/restFooter';
import { DELIVERY_CHARGES, TAX } from '../lib/const';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [cartStorage, setCartStorage] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartNumber, setCartNumber] = useState(0); // State to track cart items count
  const router = useRouter();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartStorage(cartItems);
    calculateTotal(cartItems); // Call calculateTotal initially
    setCartNumber(cartItems.length); // Set initial cart items count
  }, []);

  // Define calculateTotal function outside useEffect
  const calculateTotal = (cartItems) => {
    if (cartItems.length === 1) {
      setTotal(cartItems[0].price);
    } else {
      const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
      setTotal(totalPrice);
    }
  };

  const orderNow = () => {
    router.push('/order');
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartStorage.filter((item) => item._id !== itemId);
    setCartStorage(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart); // Update total after removing item
    setCartNumber(updatedCart.length); // Update cart items count
  };

  return (
    <div>
      <CustomerHeader cartNumber={cartNumber} /> {/* Pass cartNumber to CustomerHeader */}
      <div className="food-list-wrapper">
        {cartStorage.length > 0 ? (
          cartStorage.map((item) => (
            <div className="list-item" key={item._id}>
              <div className="list-item-block-1">
                <img style={{ width: 100 }} src={item.img_path} alt={item.name} />
              </div>
              <div className="list-item-block-2">
                <div>{item.name}</div>
                <div className="description">{item.description}</div>
                <button onClick={() => removeFromCart(item._id)}>Remove From Cart</button>
              </div>
              <div className="list-item-block-3">Price: {item.price}</div>
            </div>
          ))
        ) : (
          <h1>No Food Items in Cart</h1>
        )}
      </div>
      <div className="total-wrapper">
        <div className="block-1">
          <div className="row">
            <span>Food Charges :</span>
            <span>{total}</span>
          </div>
          <div className="row">
            <span>Tax :</span>
            <span>{(total * TAX) / 100}</span>
          </div>
          <div className="row">
            <span>Delivery Charges :</span>
            <span>{DELIVERY_CHARGES}</span>
          </div>
          <div className="row">
            <span>Total Amount :</span>
            <span>{total + DELIVERY_CHARGES + (total * TAX) / 100}</span>
          </div>
        </div>
        <div className="block-2">
          <button onClick={orderNow}>Order Now</button>
        </div>
      </div>
      <RestFooter />
    </div>
  );
};

export default Page;
