// src/components/Products.js
import React from "react";
import ProductCard from "../../../common/ProductCard";
import ProductCardShimmer from "../../../common/ProductCardShimmer";

const Products = ({ products, loading }) => {
    return (
        <div className="pb-20 flex-1">
            <div className="product-container flex flex-wrap justify-evenly">
                {loading
                    ? Array(8)
                          .fill()
                          .map((_, idx) => (
                              <div className="p-2" key={idx}>
                                  <ProductCardShimmer key={idx} />
                              </div>
                          ))
                    : products.map((product) => (
                          <div className="p-2" key={product.productId}>
                              <ProductCard product={product} />
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default Products;
