import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Welcome.css";
import Header from "../../Header/Header";
import { useState } from "react";
import AuthContext from "../../../Context/AuthContext";
import { useContext } from "react";
import Login from "./Login/Login";

function Welcome() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState();
  const { userFromDb, setUserFromDb } = useContext(AuthContext);
  const [msg, setMsg] = useState(false);

  return (
    // <AuthContext.Provider value={{ ...userFromDb, userFromDb: authUser }}>
    <div className="Welcome">
      <Header />
      <div className="container">
        {/* <Login /> */}
        <Outlet />
      </div>
    </div>
    // </AuthContext.Provider>
  );
}

export default Welcome;
