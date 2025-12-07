import { NavLink } from "react-router-dom";
import "./HeaderAdmin.css";
import { useContext } from "react";
import AuthContext from "../../../Context/AuthContext";

function HeaderAdmin() {
  const { userFromDb, setUserFromDb } = useContext(AuthContext);
  console.log(userFromDb);
  return (
    <div className="HeaderAdmin">
      {/* {console.log(userFromDb)} */}
      <div className="container">
        <div className="content">
          <h3>שלום {userFromDb?.user_name}</h3>
          <div className="btn-group">
            <NavLink className="btn btn-primary" to={"/admin"}>
              חזרה
            </NavLink>
            <NavLink className="btn btn-primary" to={"/new-event"}>
              יצירת אירוע חדש
            </NavLink>
            <NavLink className="btn btn-primary" to={"/client"}>
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
