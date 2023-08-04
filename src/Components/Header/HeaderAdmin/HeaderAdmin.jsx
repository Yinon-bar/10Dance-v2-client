import { NavLink } from "react-router-dom";
import "./HeaderAdmin.css";

function HeaderAdmin() {
    return (
        <div className="HeaderAdmin">
            <div className="container">
                <div className="content">
                    <h3>שלום ינון בר</h3>
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
