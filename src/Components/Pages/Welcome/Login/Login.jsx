import { useContext, useState } from "react";
import "./Login.css";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../../../Context/AuthContext";
import { api } from "../../../../API/client";

function Login() {
  const [msg, setMsg] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user_institute: "6400",
    user_email: "",
    user_password: "",
  });
  const { userFromDb, setUserFromDb } = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const resp = await api.post("/login.php", user);
      // console.log(resp.data);
      if (resp.data.error) {
        console.log(resp.data.error);
        setMsg(true);
      } else {
        setUserFromDb(resp.data);
        localStorage.setItem("User", JSON.stringify(resp.data.jwt));
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
              onChange={(e) => setUser({ ...user, user_email: e.target.value })}
              placeholder="6400"
            />
          </label>
          <label>
            אימייל
            <input
              type="text"
              onChange={(e) => setUser({ ...user, user_email: e.target.value })}
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
          <button onClick={(e) => handleLogin(e)} className="btn btn-primary">
            כניסה
          </button>
        </form>
      </div>
      <p className="lowerTxt">
        אם אינך רשום למערכת
        <Link to={"/welcome/register"}> לחץ כאן </Link>
      </p>
    </div>
  );
}

export default Login;
