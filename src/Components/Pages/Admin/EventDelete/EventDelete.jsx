import { useContext, useEffect, useState } from "react";
import "./EventDelete.css";
import { FaTrashAlt } from "react-icons/fa";
import CurrentEvent from "../../../../Context/CurrentEventContext";
import { api } from "../../../../API/client";
import ConfirmDelete from "./ConfirmDelete/ConfirmDelete";
import ClearScreen from "../../../../Context/ClearScreen";

const EventDelete = () => {
  const { currentEvent, setCurrentEvent } = useContext(CurrentEvent);
  const { clearScreen, setClearScreen } = useContext(ClearScreen);

  const handleDelete = () => {
    console.log(currentEvent);
    // deleteEvent();
    setClearScreen({ ...clearScreen, btnEventAdd: true });
  };

  const deleteEvent = async () => {
    // console.log(currentEvent.id);
    const resp = await api.delete(`/delete-event.php?id=` + currentEvent.id);
    console.log(resp);
  };

  if (clearScreen.btnEventAdd) {
    return <ConfirmDelete />;
  }

  return (
    <div className="EventDelete" onClick={(e) => handleDelete(e)}>
      <FaTrashAlt className="trash" size={25} /> &nbsp; מחיקת אירוע
    </div>
  );
};

export default EventDelete;
