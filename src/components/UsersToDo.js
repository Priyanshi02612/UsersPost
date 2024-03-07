import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUsersToDoById } from "../services/user.service";
import useFetchData from "../hooks/useFetchData";

const UsersToDo = () => {
  const navigateToUser = useNavigate();
  const location = useLocation();
  const user = location.state.userdata;
  const {
    isLoading,
    error,
    data: usersToDoList,
    setData: setUsersToDoList
  } = useFetchData(getUsersToDoById, user.id);

  const handleCheckboxChange = (index) => {
    const updatedData = usersToDoList.map((todoData, i) =>
      i === index ? { ...todoData, completed: true } : todoData
    );
    setUsersToDoList(updatedData);
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
    <div className="container my-5 p-3 user-info">
      <div className=" my-4 text-end">
        <button
          className="btn h-50 btn-primary"
          onClick={() => navigateToUser(-1)}
        >
          Back to users
        </button>
      </div>

      <h3 className="text-center">~ User's Todo List ~</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>ToDo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {usersToDoList.map((todo, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{todo.todo}</td>
              <td
                className="d-flex gap-2"
                style={{ color: todo.completed ? "green" : "red" }}
              >
                {todo.completed ? (
                  <>
                    <input
                      id="checkbox"
                      className="form-check-input checkbox"
                      type="checkbox"
                      checked={true}
                      disabled
                    />
                    Completed
                  </>
                ) : (
                  <label
                    for="checkbox"
                    className="form-check-label d-flex gap-2"
                  >
                    <input
                      id="checkbox"
                      className="form-check-input checkbox"
                      type="checkbox"
                      checked={false}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    Pending
                  </label>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersToDo;
