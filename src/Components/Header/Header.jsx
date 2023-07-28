import "./Header.css";

import uni_logo from "../../assets/img/uni_logo.png";
import logo from "../../assets/img/logo.png";

function Header() {
    return (
        <div className="Header">
            <div className="logo-line">
                <div className="logos-flex">
                    <div className="uni-logos">
                        <img className="logo logo-uni" src={uni_logo} alt="" />
                    </div>
                    <img className="logo logo-10dance" src={logo} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Header;
