import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  getProductsByCategory,
} from "../services/products.service";
import useFetchData from "../hooks/useFetchData";

const Products = () => {
  const { isLoading, error, data: products } = useFetchData(getAllProducts);

  if (isLoading) {
    return (
      <div id="products" className="text-center">
        <span
          className="spinner-grow spinner-grow-sm mx-2"
          role="status"
          aria-hidden="true"
        ></span>
        <span
          className="spinner-grow spinner-grow-sm mx-2"
          role="status"
          aria-hidden="true"
        ></span>
        <span
          className="spinner-grow spinner-grow-sm mx-2"
          role="status"
          aria-hidden="true"
        ></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="container-fluid d-flex justify-content-center gap-5 flex-wrap my-5 ">
      {products &&
        products.map((product, index) => (
          <div
            key={index}
            className="product-container p-2"
            style={{ width: "20rem", height: "36rem" }}
          >
            <h5 className="product-title text-center">{product.title}</h5>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="card-image img rounded"
            />
            <div className="product-body mt-3">
              <div className="d-flex gap-3 align-items-center justify-content-center">
                <span className="product-price h5">{product.price} Rs.</span>
                <span className="d-flex gap-2 align-items-center">
                  <span className="product-discount h5 bg-success rounded-4 text-light p-1">
                    {product.discountPercentage} %
                  </span>
                  <span className="h6">Off</span>
                </span>
              </div>
            </div>
            <div className="text-center d-flex flex-column">
              <span>Brand: {product.brand}</span>
              <span className="d-flex justify-content-center gap-2 mt-5">
                Only <h3>{product.stock}</h3> in stock hurrry up!
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
