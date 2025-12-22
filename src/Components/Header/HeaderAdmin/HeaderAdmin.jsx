import { Navigate, NavLink, useNavigate } from "react-router-dom";
import "./HeaderAdmin.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../Context/AuthContext";
import CurrentEvent from "../../../Context/CurrentEventContext";
import { jwtDecode } from "jwt-decode";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";

function HeaderAdmin() {
  const { userFromDb, setUserFromDb } = useContext(AuthContext);
  const { currentEvent } = useContext(CurrentEvent);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
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
      setUserFromDb(userTokenDecoded.data);
      // console.log(userTokenDecoded.data);
      if (userTokenDecoded.data.role === 3) {
        setIsSuperAdmin(true);
      }
    }
    if (currentEvent) {
      // console.log("Is current event");
    } else {
      console.log("No current event");
    }
  }, [currentEvent]);

  // console.log(userFromDb);
  return (
    <div
      className="HeaderAdmin"
      style={{
        backgroundColor: isSuperAdmin ? "var(--color-mainBlue)" : "",
      }}
    >
      <div className="container">
        <div className="content">
          <h3>
            שלום {userFromDb?.name}
            {isSuperAdmin ? ",  מנהל מערכת" : ""}
            <span className="logout" onClick={(e) => handleLogout(e)}>
              &nbsp; &nbsp;התנתק
            </span>
          </h3>
          <div className="btn-group">
            <NavLink className="btn btn-primary btnBack" to={"/select-event"}>
              <MdArrowForwardIos className="back" size={30} />
              בחירת אירוע
            </NavLink>
            {isSuperAdmin && (
              <NavLink className="btn btn-primary" to={"../welcome/register"}>
                הוספת מנהל
              </NavLink>
            )}
            <NavLink className="btn btn-primary" to={"/admin"}>
              למסך הבית
            </NavLink>
            <NavLink className={"btn btn-primary"} to={"/about"}>
              אודות
            </NavLink>
            <NavLink className={"btn btn-primary btnBack"} to={"/client"}>
              למסך קבלת פנים
              <MdArrowBackIos className="forward" size={30} />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderAdmin;
