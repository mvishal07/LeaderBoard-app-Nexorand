import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import { UserProvider } from "./context/UserContext";
import Home from "./components/Home";
import LeaderBoard from "./components/LeaderBoard";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/leaderboard" element={<LeaderBoard/>}/>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
