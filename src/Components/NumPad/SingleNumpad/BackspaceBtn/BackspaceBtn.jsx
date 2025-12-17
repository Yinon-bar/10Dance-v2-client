import "./BackspaceBtn.css";
import { useContext } from "react";
import NumberContext from "../../../../Context/NumberContext";
import { IoBackspace } from "react-icons/io5";

export const BackspaceBtn = () => {
  const { inputValue } = useContext(NumberContext);
  const { setInputValue } = useContext(NumberContext);

  return (
    <div className="Delete">
      <IoBackspace
        size="40"
        onClick={() => setInputValue(inputValue.slice(0, -1))}
      />
    </div>
  );
};
