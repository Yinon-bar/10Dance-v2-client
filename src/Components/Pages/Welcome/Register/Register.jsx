import { useContext, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../../Context/AuthContext";

function Register() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { userFromDb, setUserFromDb } = useContext(AuthContext);

  const [user, setUser] = useState({
    user_institute: "6400",
    user_email: "",
    user_password: "",
    user_name: "",
  });

  const handleLogin = (event) => {
    event.preventDefault();
    // console.log(user);
    axios
      .post(
        "http://localhost/10Dance-V2-php-server/4-controllers/register.php",
        user
      )
      .then((resp) => {
        console.log(resp);
        if (resp.data.error) {
          // console.log(resp.data.error);
          setMsg(true);
        } else {
          // console.log(resp.data.data);
          setUserFromDb(resp.data.data);
          navigate("/admin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Register">
      <div className="Login">
        <div className="content">
          <h1 className="title">
            ברוכים הבאים לתכנת <span className="cng-font">10Dance</span>
          </h1>
          <h2>אנא הכנס פרטי התחברות</h2>
          {msg && <h2>פרטי החיבור אינם נכונים</h2>}
          <form action="" className="login">
            <label>
              מזהה מוסד
              <input
                type="number"
                onChange={(e) =>
                  setUser({ ...user, user_institute: e.target.value })
                }
                placeholder="6400"
              />
            </label>
            <label>
              אימייל
              <input
                type="text"
                onChange={(e) =>
                  setUser({ ...user, user_email: e.target.value })
                }
              />
            </label>
            <label>
              סיסמה:
              <input
                type="text"
                onChange={(e) =>
                  setUser({ ...user, user_password: e.target.value })
                }
              />
            </label>
            <label>
              שם משתמש:
              <input
                type="text"
                onChange={(e) =>
                  setUser({ ...user, user_name: e.target.value })
                }
              />
            </label>
            <button onClick={(e) => handleLogin(e)} className="btn btn-primary">
              הרשמה
            </button>
          </form>
        </div>
        <p className="lowerTxt">
          כבר נרשמת למערכת?
          <Link to={"/welcome/login"}> לחץ כאן להחברות</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
