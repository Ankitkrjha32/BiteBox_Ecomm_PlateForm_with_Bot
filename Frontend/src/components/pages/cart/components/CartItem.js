import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const CartItem = ({ item, onUpdateCart, onRemoveItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const { product } = item;
  
  const handleQuantityChange = async (newQuantity) => {
    console.log("New quantity:", newQuantity);
    if (newQuantity < 1 || newQuantity > product.quantityInStock) return;
    
    setIsUpdating(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];
      
      if (!token) {
        toast.error("Authentication error");
        return;
      }

      const response = await axios.put(
        `${backendUrl}/api/v1/users/cart/${product._id}`,
        { quantity: newQuantity },
        { headers: { 'Authorization': `Bearer ${token}` }}
      );

      if (response.status === 200) {
        setQuantity(newQuantity);
        onUpdateCart();
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
      toast.error(error.response?.data?.message || "Failed to update quantity");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async () => {
    setIsUpdating(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];
      
      if (!token) {
        toast.error("Authentication error");
        return;
      }

      const response = await axios.delete(
        `${backendUrl}/api/v1/users/cart/${product._id}`,
        { headers: { 'Authorization': `Bearer ${token}` }}
      );

      if (response.status === 200) {
        toast.success("Item removed from cart");
        onRemoveItem(product._id);
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
      toast.error(error.response?.data?.message || "Failed to remove item");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row border-b border-gray-200 py-4 gap-4 relative">
      {isUpdating && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}
      
      <div className="sm:w-1/4">
        <img 
          src={product.imageurl} 
          alt={product.name} 
          className="w-full sm:w-36 h-36 object-cover rounded-md"
        />
      </div>
      
      <div className="sm:w-3/4 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500">{product.category}</p>
            <p className="text-sm">{product.isOrganic ? "Organic" : ""}</p>
          </div>
          
          <div className="text-right">
            <p className="text-green-600 font-semibold">{"\u20B9"}{product.discountedPrice} per {product.unit}</p>
            <p className="line-through text-gray-500 text-sm">{"\u20B9"}{product.price}</p>
            <p className="text-green-600 text-sm">Save {product.discount}%</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center border border-gray-300 rounded">
            <button 
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={isUpdating || quantity <= 1}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400"
            >
              -
            </button>
            <span className="px-3 py-1">{quantity}</span>
            <button 
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={isUpdating || quantity >= product.quantityInStock}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400"
            >
              +
            </button>
          </div>
          
          <div>
            <button 
              onClick={handleRemoveItem}
              disabled={isUpdating}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Remove
            </button>
          </div>
          
          <div className="font-semibold text-lg">
            {"\u20B9"}{(product.discountedPrice * quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
