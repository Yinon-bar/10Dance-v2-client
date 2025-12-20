import { useContext, useEffect, useState } from "react";
import "./ConfirmDelete.css";
import ClearScreen from "../../../../../Context/ClearScreen";
import { api } from "../../../../../API/client";

const ConfirmDelete = () => {
  const { clearScreen, setClearScreen } = useContext(ClearScreen);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const deleteEvent = async () => {
    try {
      // console.log(currentEvent.id);
      const currentEvent = JSON.parse(localStorage.getItem("Current Event"));
      // console.log(currentEvent);
      const resp = await api.delete(`/delete-event.php?id=` + currentEvent.id);
      console.log(resp);
      setSuccessMessage(resp.data.message);
      setTimeout(() => {
        setClearScreen({ ...clearScreen, btnEventAdd: false });
        setSuccessMessage("");
        setErrorMessage("");
      }, 2500);
    } catch (error) {
      console.log(error);
      setSuccessMessage("");
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="ConfirmDelete">
      <div className="deleteModal">
        <div className="header">
          <h1>מחיקת אירוע</h1>
        </div>
        <h2>האם אתה בטוח שברצונך למחוק את האירוע?</h2>
        <h3 className="warningTitle">פעולה זאת אינה ניתנת לביטול</h3>
        <div className="btns">
          <button className="deleteBtn" onClick={deleteEvent}>
            כן להמשיך
          </button>
          <button
            className="cancelBtn"
            onClick={() =>
              setClearScreen({ ...clearScreen, btnEventAdd: false })
            }
          >
            ביטול
          </button>
        </div>
        {successMessage && <h2 className="success">{successMessage}</h2>}
        {errorMessage && <h2 className="error">{errorMessage}</h2>}
      </div>
    </div>
  );
};

export default ConfirmDelete;
