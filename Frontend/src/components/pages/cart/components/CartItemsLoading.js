import React from 'react';

const CartItemsLoading = () => {
  return (
    <div className="animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex flex-col sm:flex-row border-b border-gray-200 py-4 gap-4">
          <div className="sm:w-1/4">
            <div className="bg-gray-200 w-full sm:w-36 h-36 rounded-md"></div>
          </div>
          
          <div className="sm:w-3/4 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              
              <div className="text-right">
                <div className="h-5 bg-gray-200 rounded w-20 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-14"></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-5 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemsLoading;
