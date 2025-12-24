import { useState } from "react";
import "./ResetPassword.css";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState({
    user_email: "",
    user_password: "",
    user_password_confirm: "",
  });
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  console.log(token);

  console.log(token);

  return (
    <div className="ForgotPassword">
      <div className="content">
        <h1 className="title">
          ברוכים הבאים לתכנת <span className="cng-font">10Dance</span>
        </h1>
        <h2>איפוס סיסמה</h2>
        {msg && <h2>פרטי החיבור אינם נכונים</h2>}
        <form className="login forgot">
          <h2>אנא הכנס סיסמה חדשה</h2>
          <label>
            אימייל:
            <input
              type="text"
              onChange={(e) =>
                setEmail({ ...user, user_email: e.target.value })
              }
            />
          </label>
          <label>
            סיסמה:
            <input
              type="text"
              onChange={(e) =>
                setEmail({ ...user, user_password: e.target.value })
              }
            />
          </label>
          <label>
            אישור סיסמה:
            <input
              type="text"
              onChange={(e) =>
                setEmail({ ...user, user_password_confirm: e.target.value })
              }
            />
          </label>
          <button onClick={(e) => handleLogin(e)} className="btn btn-primary">
            שלח
          </button>
          {msg && <h2 className="successMsg">{msg}</h2>}
        </form>
      </div>
      {/* <p className="lowerTxt">
        שכחת סיסמה?
        <Link to={"/welcome/forgot-password"}> לחץ כאן </Link>
      </p> */}
    </div>
  );
};

export default ResetPassword;
