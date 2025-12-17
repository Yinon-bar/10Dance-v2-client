import "./ClearallBtn.css";
import { useContext } from "react";
import NumberContext from "../../../../Context/NumberContext";
import { FaTrashAlt } from "react-icons/fa";

export const ClearallBtn = () => {
  const { setInputValue } = useContext(NumberContext);

  return (
    <div className="ClearBtn" onClick={() => setInputValue("")}>
      <FaTrashAlt size="33" />
    </div>
  );
};
