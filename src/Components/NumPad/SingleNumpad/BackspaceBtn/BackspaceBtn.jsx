import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "./BackspaceBtn.css";
import { useContext } from "react";
import NumberContext from "../../../../Context/NumberContext";

export const BackspaceBtn = () => {
    const { inputValue } = useContext(NumberContext);
    const { setInputValue } = useContext(NumberContext);

    return (
        <div className="btn btn-trash">
            <FontAwesomeIcon
                icon={faAngleLeft}
                onClick={() => setInputValue(inputValue.slice(0, -1))}
            />
        </div>
    );
};
