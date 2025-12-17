import { useContext, useState } from "react";
import "./EventDelete.css";
import { FaTrashAlt } from "react-icons/fa";
import CurrentEvent from "../../../../Context/CurrentEventContext";
import { api } from "../../../../API/client";
import ConfirmDelete from "./ConfirmDelete/ConfirmDelete";

const EventDelete = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { currentEvent, setCurrentEvent } = useContext(CurrentEvent);

  const handleDelete = () => {
    console.log(currentEvent);
    setConfirmDelete(true);
    // deleteEvent();
  };

  const deleteEvent = async () => {
    // console.log(currentEvent.id);
    const resp = await api.delete(`/delete-event.php?id=` + currentEvent.id);
    console.log(resp);
  };

  return (
    <div className="EventDelete" onClick={(e) => handleDelete(e)}>
      {confirmDelete && <ConfirmDelete />}
      <FaTrashAlt className="trash" size={25} /> &nbsp; מחיקת אירוע
    </div>
  );
};

export default EventDelete;
