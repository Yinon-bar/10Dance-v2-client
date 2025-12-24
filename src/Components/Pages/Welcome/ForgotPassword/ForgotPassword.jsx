import { useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import { api } from "../../../../API/client";

const ForgotPassword = () => {
  const [msg, setMsg] = useState();
  const [email, setEmail] = useState({
    email: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    sendResetRequest();
  };

  const sendResetRequest = async () => {
    try {
      const resp = await api.post("/forgot-password.php", email);
      console.log(resp.data);
      setMsg(resp.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ForgotPassword">
      <div className="content">
        <h1 className="title">
          ברוכים הבאים לתכנת <span className="cng-font">10Dance</span>
        </h1>
        <h2>איפוס סיסמה</h2>
        {msg && <h2>פרטי החיבור אינם נכונים</h2>}
        <form className="login forgot">
          <h2>אנא הכנס מייל לאיפוס סיסמה</h2>
          <label>
            אימייל
            <input
              type="text"
              onChange={(e) => setEmail({ email: e.target.value })}
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

export default ForgotPassword;
