import React, { useEffect, useState } from "react";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import Popup from "reactjs-popup";
import "./index.css";
import Header from '../Header'
import "reactjs-popup/dist/index.css";

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [timefilter, setFilter] = useState("daily");

  useEffect(() => {
    fetchDailyHistory();
  }, []);

  const fetchDailyHistory = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/user/v1/your-daily-history");
      if (response.data.success) {
        const sortedUsers = response.data.data.sort((a, b) => b.totalPointsAwarded - a.totalPointsAwarded);
        setUsers(sortedUsers);
        setFilter("daily");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWeeklyHistory = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/user/v1/your-weekly-history");
      if (response.data.success) {
        const sortedUsers = response.data.data.sort((a, b) => b.totalPointsAwarded - a.totalPointsAwarded);
        setUsers(sortedUsers);
        setFilter("weekly");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMonthlyHistory = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/user/v1/your-monthly-history");
      if (response.data.success) {
        const sortedUsers = response.data.data.sort((a, b) => b.totalPointsAwarded - a.totalPointsAwarded);
        setUsers(sortedUsers);
        setFilter("monthly");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserHistory = async (username) => {
    try {
      const response = await axios.post("http://localhost:7000/api/user/v1/your-history", { username });
      if (response.data.success) {
        setHistory(response.data.data);
        setSelectedUser(username);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  };

  return (
    <>
    <Header/>
    <div className="leaderboard-card">
      <h1>Leaderboard</h1>
      <div className="buttons-card">
        <button
          onClick={fetchDailyHistory}
          className={timefilter === "daily" ? "activebtn" : "filterbtn"}
        >
          Daily
        </button>
        <button
          onClick={fetchWeeklyHistory}
          className={timefilter === "weekly" ? "activebtn" : "filterbtn"}
        >
          Weekly
        </button>
        <button
          onClick={fetchMonthlyHistory}
          className={timefilter === "monthly" ? "activebtn" : "filterbtn"}
        >
          Monthly
        </button>
      </div>

      <div >
        <ul className="rank-card">
          {users.slice(0,3).map((user,index)=>(
            <li className="user-li">
              <p>{user._id}</p>
              <p>{user.totalPointsAwarded}</p>
              <p className="prize">Prize: ₹{user.totalPointsAwarded}</p>
            </li>
          ))}
        </ul>
      </div>

      <ul>
        {users.map((user,index) => (
          <li
            key={user._id}
            onClick={() => fetchUserHistory(user._id)}
            className="user-list"
          >
            <div className="user-info">
              <CgProfile />
              <p>{user._id}</p>
              <p>Rank {index+1}</p>
            </div>
            <p className="prize">Prize: ₹{user.totalPointsAwarded}</p>
            <p className="points">{user.totalPointsAwarded}</p>
          </li>
        ))}
      </ul>

      

      <Popup open={showModal} onClose={() => setShowModal(false)} modal className="modal-card">
        <div className="modal-content">
          <h2>test's History</h2>
          <ul>
            {history.map((entry, index) => (
              <li key={index} className="each-history">
                <p>Date: {entry.date}</p>
                <p>Points Awarded: {entry.pointsAwarded}</p>
      
              </li>
            ))}
          </ul>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      </Popup>
    </div>
    </>
  );
};

export default LeaderBoard;
