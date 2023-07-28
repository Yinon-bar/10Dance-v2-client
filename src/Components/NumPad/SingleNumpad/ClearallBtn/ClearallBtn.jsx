import "./ClearallBtn.css";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import NumberContext from "../../../../Context/NumberContext";

export const ClearallBtn = () => {
    const { setInputValue } = useContext(NumberContext);

    return (
        <div className="btn btn-trash" onClick={() => setInputValue("")}>
            <FontAwesomeIcon icon={faTrashCan} />
        </div>
    );
};
