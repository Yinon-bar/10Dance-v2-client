import { NavLink } from "react-router-dom";
import "./HeaderAdmin.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../Context/AuthContext";
import CurrentEvent from "../../../Context/CurrentEventContext";

function HeaderAdmin() {
  const { userFromDb, setUserFromDb } = useContext(AuthContext);
  const { currentEvent } = useContext(CurrentEvent);

  useEffect(() => {
    // console.log(currentEvent);
    if (
      localStorage.getItem("User") !== null &&
      localStorage.getItem("User").length > 0
    ) {
      // console.log("User Exist");
      const parcedUserFromLocal = JSON.parse(localStorage.getItem("User"));
      setUserFromDb(parcedUserFromLocal);
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
      {/* {console.log(currentEvent)} */}
      <div className="container">
        <div className="content">
          <h3>
            שלום {userFromDb?.user_name}
            <span className="logout"> &nbsp; &nbsp;התנתק </span>
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
            <button className="btn btn-primary">אודות</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderAdmin;
