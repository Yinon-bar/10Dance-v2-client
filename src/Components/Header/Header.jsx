import "./Header.css";
import logo from "../../assets/img/10dance_logo_white.jpg";

function Header() {
  return (
    <div className="Header">
      <img className="logo-10dance" src={logo} alt="" />
    </div>
  );
}

export default Header;
