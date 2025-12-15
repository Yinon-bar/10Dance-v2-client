import { Navigate, NavLink, useNavigate } from "react-router-dom";
import "./HeaderAdmin.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../Context/AuthContext";
import CurrentEvent from "../../../Context/CurrentEventContext";
import { jwtDecode } from "jwt-decode";

function HeaderAdmin() {
  const { userFromDb, setUserFromDb } = useContext(AuthContext);
  const { currentEvent } = useContext(CurrentEvent);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem("User");
    navigate("/");
  };

  useEffect(() => {
    // console.log(currentEvent);
    if (
      localStorage.getItem("User") !== null &&
      localStorage.getItem("User").length > 0
    ) {
      // console.log("User Exist");
      const parcedUserFromLocal = JSON.parse(localStorage.getItem("User"));
      const userTokenDecoded = jwtDecode(parcedUserFromLocal);
      // console.log(userTokenDecoded.data);
      setUserFromDb(userTokenDecoded.data);
    }
    if (currentEvent) {
      // console.log("Is current event");
    } else {
      console.log("No current event");
    }
  }, [currentEvent]);

  // console.log(userFromDb);
  return (
    <div className="HeaderAdmin">
      <div className="container">
        <div className="content">
          <h3>
            שלום {userFromDb?.name}
            <span className="logout" onClick={(e) => handleLogout(e)}>
              &nbsp; &nbsp;התנתק
            </span>
          </h3>
          <div className="btn-group">
            <NavLink className="btn btn-primary" to={"/admin"}>
              למסך הבית
            </NavLink>
            <NavLink className="btn btn-primary" to={"/new-event"}>
              יצירת אירוע חדש
            </NavLink>
            <NavLink
              className={
                currentEvent.length < 1
                  ? "btn btn-primary disableLink"
                  : "btn btn-primary"
              }
              to={"/client"}
            >
              למסך קבלת פנים
            </NavLink>
            <NavLink className={"btn btn-primary"} to={"/about"}>
              אודות
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderAdmin;
