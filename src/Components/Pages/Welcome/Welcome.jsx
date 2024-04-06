import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Welcome.css";
import Header from "../../Header/Header";
import { useState } from "react";

function Welcome() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState(false);
  const [user, setUser] = useState({
    user_email: "",
    user_password: "",
    jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJpYXQiOjE3MTI0MDQ2NDYsIm5iZiI6MTcxMjQwNDY0NiwiZXhwIjoxNzEyNjYzODQ2LCJhdWQiOiJteXVzZXJzIiwiZGF0YSI6eyJpZCI6MSwibmFtZSI6Inlpbm9uX2JhciIsImVtYWlsIjoieWlub25iYXIxOTg4QGdtYWlsLmNvbSJ9fQ.Ew0pBePym9b_PQwLpDB69BXROtraOMTclSZTvBPWlkk",
  });

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(user);
    axios
      .post(
        "http://localhost/10Dance-V2-php-server/4-controllers/login.php",
        user
      )
      .then((resp) => {
        console.log(resp);
        if (resp.data.error) {
          // console.log(resp.data.error);
          setMsg(true);
        } else {
          // console.log(resp.data);
          navigate("admin");
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <div className="Welcome">
      <Header />
      <div className="container">
        <div className="content">
          <h1>
            ברוכים הבאים לתכנת <span className="cng-font">10Dance</span>
          </h1>
          <h2>אנא הכנס פרטי התחברות</h2>
          {msg && <h2>פרטי החיבור אינם נכונים</h2>}
          <form action="" className="login">
            <label>
              אימייל
              <input
                type="text"
                onChange={(e) =>
                  setUser({ ...user, user_email: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              סיסמה:
              <input
                type="text"
                onChange={(e) =>
                  setUser({ ...user, user_password: e.target.value })
                }
              />
            </label>
            <button onClick={(e) => handleLogin(e)} className="btn btn-primary">
              כניסה
            </button>
          </form>
          {/* <NavLink className="btn btn-primary" to={"admin"}>
            כניסה
          </NavLink> */}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
