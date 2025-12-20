import { useContext, useEffect } from "react";
import "./ConfirmDelete.css";
import ClearScreen from "../../../../../Context/ClearScreen";

const ConfirmDelete = () => {
  const { clearScreen, setClearScreen } = useContext(ClearScreen);

  useEffect(() => {
    console.log(clearScreen);
  }, []);

  return (
    <div className="ConfirmDelete">
      <div className="deleteModal">
        <div className="header">
          <h1>מחיקת אירוע</h1>
        </div>
        <h2>האם אתה בטוח שברצונך למחוק את האירוע?</h2>
        <h3 className="warningTitle">פעולה זאת אינה ניתנת לביטול</h3>
        <div className="btns">
          <button className="deleteBtn">כן להמשיך</button>
          <button
            className="cancelBtn"
            onClick={() =>
              setClearScreen({ ...clearScreen, btnEventAdd: false })
            }
          >
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
