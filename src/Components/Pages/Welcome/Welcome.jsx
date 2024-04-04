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
            ברוכים הבאים לתכנת <span className="cng-font">10Dance</span>
          </h1>
          <h2>אנא הכנס פרטי התחברות</h2>
          <form action="">
            <label>
              שם משתמש:
              <input type="text" name="" />
            </label>
            <br />
            <label>
              סיסמה:
              <input type="text" name="" />
            </label>
          </form>
          <NavLink className="btn btn-primary" to={"admin"}>
            כניסה
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
