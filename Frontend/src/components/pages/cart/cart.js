import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

// Components
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import EmptyCart from './components/EmptyCart';
import CartItemsLoading from './components/CartItemsLoading';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      // getMe
      const res = await axios.get(`${backendUrl}/api/v1/users/me`, { withCredentials: true });
      if (res.status !== 200) {
        setError("Please log in to view your cart");
        setLoading(false);
        return;
      }

      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];
      
      if (!token) {
        setError("Please log in to view your cart");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${backendUrl}/api/v1/users/cart`,
        { headers: { 'Authorization': `Bearer ${token}` }}
      );

      setCartItems(response.data.cart || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError(error.response?.data?.message || "Failed to load cart");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemoveItem = (productId) => {
    setCartItems(cartItems.filter(item => item.product._id !== productId));
  };

  return (
    <div className="bg-[#ecffe9] min-h-screen py-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
        
        {error && !loading && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}
        
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <CartItemsLoading />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white p-4 rounded-lg shadow-md animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                ))}
                <div className="h-10 bg-gray-200 rounded w-full mt-6"></div>
              </div>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Cart Items ({cartItems.length})
                </h2>
                
                {cartItems.map((item) => (
                  <CartItem 
                    key={item.product._id} 
                    item={item} 
                    onUpdateCart={fetchCart}
                    onRemoveItem={handleRemoveItem}
                  />
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <CartSummary cartItems={cartItems} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
