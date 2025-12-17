import "./ListNumpad.css";
import { BackspaceBtn } from "../SingleNumpad/BackspaceBtn/BackspaceBtn";
import { ClearallBtn } from "../SingleNumpad/ClearallBtn/ClearallBtn";
import SingleNumpad from "../SingleNumpad/SingleNumpad";
import { ZeroBtn } from "../SingleNumpad/ZeroBtn/ZeroBtn";
import { FaCheck } from "react-icons/fa";

function ListNumpad() {
  const num = [9, 8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <div className="ListNumpad">
      {num.map((num) => (
        <SingleNumpad key={num} num={num} />
      ))}
      <BackspaceBtn />
      <ZeroBtn num={0} />
      <ClearallBtn />
      <button className="btn-submit">
        <FaCheck size="35" />
      </button>
    </div>
  );
}

export default ListNumpad;
