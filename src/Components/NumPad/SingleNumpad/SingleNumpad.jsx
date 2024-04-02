import { useContext } from "react";
import "./SingleNumpad.css";
import NumberContext from "../../../Context/NumberContext";
import { BackspaceBtn } from "./BackspaceBtn/BackspaceBtn";

function SingleNumpad(props) {
  const { inputValue, setInputValue } = useContext(NumberContext);

  return (
    <div className="SingleNumPad">
      <div
        className="btn"
        onClick={(e) => setInputValue(inputValue + e.target.innerHTML)}
      >
        {props.num}
      </div>
    </div>
  );
}

export default SingleNumpad;
