import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUsersAllCartsByUserId } from "../services/user.service";
import useFetchData from "../hooks/useFetchData";

const UsersCarts = () => {
  const navigateToUser = useNavigate();
  const location = useLocation();
  const user = location.state.userdata;
  const {
    isLoading,
    error,
    data: carts,
  } = useFetchData(getUsersAllCartsByUserId, user.id);

  if (isLoading) {
    return (
      <div className="container-fluid">
        <div className="text-center">
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid mt-5 pt-5">
        <h2 className="text-center">Error while fetching details....</h2>
      </div>
    );
  }

  return (
    <div className="container my-5 p-3 user-info">
      <div className=" my-4 text-end">
        <button
          className="btn h-50 btn-primary"
          onClick={() => navigateToUser(-1)}
        >
          Back to users
        </button>
      </div>
      <h3 className="text-center">~ User's Cart Details ~</h3>
      {carts.length > 0 ? (
        <>
          {carts.map((item, index) => (
            <div key={index}>
              <hr />
              <h4>Products List:</h4>
              <div className="">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product name</th>
                      <th>Price</th>
                      <th>Quntity</th>
                      <th>Total price</th>
                      <th>Discount</th>
                      <th>Discounted price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.products.map((product, i) => (
                      <tr key={i}>
                        <td>{product.title.toUpperCase()}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td className=" text-decoration-line-through td text-light-emphasis">
                          {product.total}
                        </td>
                        <td>{product.discountPercentage} %</td>
                        <td>{product.discountedPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <hr />
              <div className="d-flex justify-content-evenly">
                <div>Total Qauntity: {item.totalQuantity}</div>
                <div>Total Price: {item.total} Rs.</div>
                <div>Total Discounted price: {item.discountedTotal} Rs.</div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="text-center mt-5 h4">
          <hr />
          Cart is empty!!
        </div>
      )}
    </div>
  );
};

export default UsersCarts;
