import { NavLink } from "react-router-dom";
import "./Welcome.css";
import Header from "../../Header/Header";

function Welcome() {
    return (
        <div className="Welcome">
            <Header />
            <div className="container">
                <div className="content">
                    <h1>
                        ברוכים הבאים לתכנת{" "}
                        <span className="cng-font">10Dance</span>
                    </h1>
                    <NavLink className="btn btn-primary" to={"admin"}>
                        כניסה למסך ניהול
                    </NavLink>
                    <NavLink className="btn btn-primary" to={"client"}>
                        למסך קבלת פנים
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
