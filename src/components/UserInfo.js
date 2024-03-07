import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUsersToDoById } from "../services/user.service";

const UserInfo = () => {
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
      <div className="container-fluid">
        <h3 className="text-center">~ User's Todo List ~</h3>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>ToDo</th>
                <th>Status</th>
              </tr>
            </thead>
            {usersToDoList.map((todo, index) => (
              <tbody>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{todo.todo}</td>
                  {todo.completed ? (
                    <td className=" " style={{ color: "green" }}>
                      Completed
                    </td>
                  ) : (
                    <td className="d-flex gap-3" style={{ color: "red" }}>
                      <input
                        className="form-check checkbox"
                        type="checkbox"
                      />
                      Pending
                    </td>
                  )}
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
