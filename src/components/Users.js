import React, { useEffect, useState } from "react";
import { FaEnvelope, FaSearchengin } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { getAllUsers, handleSearchUser } from "../services/user.service";

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const onSearchUsers = (users) => {
    // try {
    //   await handleSearchUser();
      const user = users.filter((user) =>
        user.firstName.toLowerCase().includes(searchValue)
      );
      return user;
    // } catch (e) {
    //   console.log("error");
    // }
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsersData(onSearchUsers(fetchedUsers));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Error while fetching users....: ");
        console.log(error);
      }
    };

    fetchUsersData();
  }, [searchValue]);

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
      <div className="container-fluid mt-5 pt-5">
        <h2 className="text-center">Error while fetching details....</h2>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="cotainer-fluid d-flex align-items-center gap-2">
        <input
          type="text"
          className="form-control my-3"
          placeholder="Search user..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="container-fluid d-flex flex-column justify-content-center">
        {usersData.map((user, index) => (
          <div
            key={index}
            className="container-fluid user-container d-flex p-2 my-4"
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
