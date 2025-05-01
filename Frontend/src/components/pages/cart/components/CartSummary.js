import React from 'react';
import { Link } from 'react-router-dom';

const CartSummary = ({ cartItems }) => {
  // Calculate summary values
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product.discountedPrice * item.quantity),
    0
  );
  
  const totalMRP = cartItems.reduce(
    (sum, item) => sum + (item.product.price * item.quantity),
    0
  );
  
  const discount = totalMRP - subtotal;
  const deliveryFee = subtotal < 500 ? 50 : 0;
  const totalAmount = subtotal + deliveryFee;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Price Details</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Price ({cartItems.length} items)</span>
          <span>{"\u20B9"}{totalMRP.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>- {"\u20B9"}{discount.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className={deliveryFee === 0 ? "text-green-600" : ""}>
            {deliveryFee === 0 ? "FREE" : `${"\u20B9"}${deliveryFee.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between font-bold pt-3 border-t">
          <span>Total Amount</span>
          <span>{"\u20B9"}{totalAmount.toFixed(2)}</span>
        </div>
        
        <div className="text-green-600 font-medium">
          You will save {"\u20B9"}{discount.toFixed(2)} on this order
        </div>
      </div>
      
      <Link to="/checkout">
        <button 
          className="w-full mt-6 bg-[#74B83E] hover:bg-[#81cb44] text-white py-3 rounded-md font-semibold transition-colors"
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </Link>
      
      <div className="mt-4 text-sm">
        <p>
          <span className="font-semibold">Free Delivery</span> on orders above {"\u20B9"}500
        </p>
        <p className="mt-2">
          <span className="font-semibold">100% Secure Payments</span> - UPI / Card / Net Banking
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
