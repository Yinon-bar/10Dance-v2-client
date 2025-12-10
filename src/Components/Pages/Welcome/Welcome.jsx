import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Welcome.css";
import Header from "../../Header/Header";
import { useState } from "react";

function Welcome() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState();
  const [msg, setMsg] = useState(false);

  return (
    <div className="Welcome">
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default Welcome;
