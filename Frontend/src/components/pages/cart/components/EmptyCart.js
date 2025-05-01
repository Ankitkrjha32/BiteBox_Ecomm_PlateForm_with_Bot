import React from 'react';
import { Link } from 'react-router-dom';
import emptyCartImage from "../../../../utils/images/header/cart.svg";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <img 
        src={emptyCartImage} 
        alt="Empty Cart" 
        // svg color black
        style={{ filter: 'invert(1)' }} // Invert colors for SVG
        className="w-64 h-64 mb-8 opacity-80"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/400x400?text=Empty+Cart'; // Fallback image
        }}
      />
      
      <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Looks like you haven't added any items to your cart yet. 
        Start shopping to fill it with fresh products!
      </p>
      
      <Link to="/">
        <button className="bg-[#74B83E] hover:bg-[#81cb44] text-white px-8 py-3 rounded-md font-semibold transition-colors">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default EmptyCart;
