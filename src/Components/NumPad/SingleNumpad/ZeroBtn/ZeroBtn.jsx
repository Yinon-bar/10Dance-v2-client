import "./ZeroBtn.css";
import { useContext } from "react";
import NumberContext from "../../../../Context/NumberContext";

export const ZeroBtn = (props) => {
  const { inputValue, setInputValue } = useContext(NumberContext);

  return (
    <div
      className="btn btn-zero"
      onClick={(e) => setInputValue(inputValue + e.target.innerHTML)}
    >
      {props.num}
    </div>
  );
};
