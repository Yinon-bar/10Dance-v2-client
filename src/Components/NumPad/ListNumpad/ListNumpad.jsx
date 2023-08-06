import "./ListNumpad.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { BackspaceBtn } from "../SingleNumpad/BackspaceBtn/BackspaceBtn";
import { ClearallBtn } from "../SingleNumpad/ClearallBtn/ClearallBtn";
import SingleNumpad from "../SingleNumpad/SingleNumpad";

function ListNumpad() {
    const num = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

    return (
        <div className="ListNumpad">
            {num.map((num) => (
                <SingleNumpad key={num} num={num} />
            ))}
            <BackspaceBtn />
            <ClearallBtn />
            <button className="btn-submit">
                <FontAwesomeIcon icon={faCheck} />
            </button>
        </div>
    );
}

export default ListNumpad;
