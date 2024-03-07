import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUsersToDoById } from "../services/user.service";

const UsersToDo = () => {
  const navigateToUser = useNavigate();
  const location = useLocation();
  const user = location.state.userdata;
  const [usersToDoList, setUsersToDoList] = useState([]);

  useEffect(() => {
    const getUsersTodo = async () => {
      try {
        const todoListData = await getUsersToDoById(user.id);
        setUsersToDoList(todoListData);
      } catch (e) {
        console.log(e);
      }
    };
    getUsersTodo();
  }, []);

  const handleCheckboxChange = (index) => {
    const updatedList = usersToDoList.map((todoData, i) =>
      i === index ? { ...todoData, completed: true } : todoData
    );
    setUsersToDoList(updatedList);
  };

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
