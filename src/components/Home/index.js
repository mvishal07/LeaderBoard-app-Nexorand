import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { CgProfile } from "react-icons/cg";

import Header from "../Header";
const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/user/v1/get-users"
      );
      if (response.data.success) {
        setUsers(response.data.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //   const claimPoints = async (username) => {
  //     try {
  //       const response = await axios.patch('http://localhost:7000/api/user/v1/claim-points', { username });
  //       if (response.data.success) {
  //         alert(response.data.message);
  //         fetchUsers();
  //       }
  //     } catch (error) {
  //       console.error("Error claiming points:", error);
  //     }
  //   };

  const claimPoints = async (username) => {
    try {
      const response = await axios.patch(
        "http://localhost:7000/api/user/v1/claim-points",
        { username }
      );
      if (response.data.success) {
        toast.success(`Points claimed successfully for ${username}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          icon: "✔️",
        });
      }
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="home-container">

        <ToastContainer />
        <ul>
          {users.slice(0, 10).map((user,index) => (
            <li
              key={user._id}
              onClick={() => claimPoints(user.username)}
              className="user-list"
            >
              <div className="user-info">
                <CgProfile />
                <p>{user.username}</p>
                <p>Rank {index+1}</p>
              </div>
              <p className="prize">Prize: ₹{user.Points}</p>
              <p className="points">{user.Points}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
