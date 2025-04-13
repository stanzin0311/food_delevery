'use Client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
  const [cartStorage, setCartStorage] = useState(
    localStorage.getItem("cart")&& JSON.parse(localStorage.getItem("cart")) || []
  );
  const userStorage =localStorage.getItem('user')&& JSON.parse(localStorage.getItem('user'));
  const [cartNumber, setCartNumber] = useState(cartStorage.length);
  const [cartItem, setCartItem] = useState(cartStorage);
  const [user, setUser] = useState(userStorage ? userStorage : undefined);
  const router = useRouter();

  useEffect(() => {
    if (props.cartData) {
      if (cartStorage.length > 0) {
        if (cartStorage[0].resto_id !== props.cartData.resto_id) {
          localStorage.setItem("cart", JSON.stringify([props.cartData]));
          setCartStorage([props.cartData]);
          setCartNumber(1);
        } else {
          const updatedCart = [...cartStorage, props.cartData];
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setCartStorage(updatedCart);
          setCartNumber(updatedCart.length);
        }
      } else {
        localStorage.setItem("cart", JSON.stringify([props.cartData]));
        setCartStorage([props.cartData]);
        setCartNumber(1);
      }
    }
  }, [props.cartData]);

  useEffect(() => {
    if (props.removeCartData) {
      const localCartItem = cartItem.filter((item) => item._id !== props.removeCartData);
      setCartItem(localCartItem);
      setCartNumber(cartNumber - 1);
      localStorage.setItem('cart', JSON.stringify(localCartItem));
      if (localCartItem.length === 0) {
        localStorage.removeItem('cart');
      }
    }
  }, [props.removeCartData]);

  useEffect(()=>{

    if(props.removeCartData){
        setCartItem([])
        setCartNumber(0);
        localStorage.removeItem('cart');
    }

},[props.removeCartData])

  const logout = () => {
    localStorage.removeItem('user');
    router.push('/user-auth');
  };

  return (
    <div className="header">
      <div className="logo">
        <img
          style={{ width: 100 }}
          src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png"
          alt="Logo"
        />
      </div>
      <ul>
        <li>
          <Link href="/" className="nav-link">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/myprofile" className="nav-link">{user?.name}</Link>
            </li>
            <li>
              <button className="logout-btn" onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/user-auth" className="nav-link">Login</Link>
            </li>
            <li>
              <Link href="/user-auth" className="nav-link">SignUp</Link>
            </li>
          </>
        )}
        <li>
          <Link href="/cart" className="nav-link">Cart ({cartNumber})</Link>
        </li>
        <li>
          <Link href="/restaurent" className="nav-link">Add Restaurant</Link>
        </li>
          <li>
          <Link href="/deliverypartner" className="nav-link">Delivery Partner</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
