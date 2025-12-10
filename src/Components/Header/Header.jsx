import "./Header.css";
import logo from "../../assets/img/לוגו גזור.png";

function Header() {
  return (
    <div className="Header">
      <div className="logo-line">
        <img className="logo logo-10dance" src={logo} alt="" />
      </div>
    </div>
  );
}

export default Header;
