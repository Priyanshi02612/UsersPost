import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UserInfo = () => {
  const navigateToUser = useNavigate();
  const location = useLocation();
  const user = location.state.userdata;

  return (
    <div className="container my-5 p-3 user-info">
      <div className="container-fluid">
        <h3 className="text-center">~ User Information ~</h3>
        <img
          className="mx-auto d-block img-thumbnail w-25"
          src={user.image}
          alt={user.firstName}
        />
        <hr />
        <div className="d-flex justify-content-evenly">
          <table>
            <thead>
              <tr>
                <th className="text-decoration-underline">
                  Personal Information:
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>
                  {user.firstName + " " + user.maidenName + " " + user.lastName}
                </td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td>{user.gender}</td>
              </tr>
              <tr>
                <td>Age:</td>
                <td>{user.age}</td>
              </tr>
              <tr>
                <td>Username:</td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>{user.password}</td>
              </tr>
              <tr>
                <td>Birthdate:</td>
                <td>{user.birthDate}</td>
              </tr>
              <tr>
                <td>Blood group:</td>
                <td>{user.bloodGroup}</td>
              </tr>
              <tr>
                <td>Height:</td>
                <td>{user.height}</td>
              </tr>
              <tr>
                <td>Weight:</td>
                <td>{user.weight}</td>
              </tr>
              <tr>
                <td>Eye color:</td>
                <td>{user.eyeColor}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <table>
              <thead>
                <tr>
                  <th className="text-decoration-underline">
                    Financial information:
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Card expiry:</td>
                  <td>{user.bank.cardExpire}</td>
                </tr>
                <tr>
                  <td>Card number:</td>
                  <td>{user.bank.cardNumber}</td>
                </tr>
                <tr>
                  <td>Card type:</td>
                  <td>{user.bank.cardType}</td>
                </tr>
                <tr>
                  <td>Card currency:</td>
                  <td>{user.bank.currency}</td>
                </tr>
                <tr>
                  <td>Iban:</td>
                  <td>{user.bank.iban}</td>
                </tr>
              </tbody>
            </table>
            <hr />
            <table>
              <thead>
                <tr>
                  <th className="text-decoration-underline">
                    Company information:
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Address:</td>
                  <td>
                    {user.company.address.address +
                      " , " +
                      user.company.address.city +
                      " , " +
                      user.company.address.state +
                      " - " +
                      user.company.address.postalCode}
                  </td>
                </tr>
                <tr>
                  <td>Department:</td>
                  <td>{user.company.department}</td>
                </tr>
                <tr>
                  <td>Company name:</td>
                  <td>{user.company.name}</td>
                </tr>
                <tr>
                  <td>Job title:</td>
                  <td>{user.company.title}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className=" my-4 text-center">
          <button
            className="btn h-50 btn-primary"
            onClick={() => navigateToUser(-1)}
          >
            Back to users
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
