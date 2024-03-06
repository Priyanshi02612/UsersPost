import React, { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../services/user.service";

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersData = async () => {
      setIsLoading(true);

      try {
        const fetchedUsers = await getAllUsers();
        setUsersData(fetchedUsers);
      } catch (error) {
        setError("Error while fetching users....: ");
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchUsersData();
  }, []);

  const navigateToUserDetails = (userdata) => {
    navigate(`/user/${userdata.id}`, { state: { userdata } });
  };

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
      <div className="container mt-5 pt-5">
        <h2 className="text-center">Error while fetching details....</h2>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="container-fluid w-75">
        {usersData.map((user, index) => (
          <div
            key={index}
            className="container-fluid user-container row p-2 my-4"
          >
            <span className="col-2 d-flex align-items-center justify-content-center">
              <img
                src={user.image}
                className="user-image"
                alt={user.firstName}
              />
            </span>

            <span className="card-text col d-flex align-items-center gap-2">
              <FaUser />
              {user.firstName + " " + user.maidenName + " " + user.lastName}
            </span>
            <span className="card-text col d-flex align-items-center gap-2">
              <FaPhone /> {user.phone}
            </span>
            <span className="card-text col d-flex align-items-center gap-2">
              <FaEnvelope /> {user.email}
            </span>

            <span className="d-flex align-items-center justify-content-center col">
              <button
                className="btn w-50 btn-primary user-details"
                onClick={() => navigateToUserDetails(user)}
              >
                User details
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
