import { useContext } from "react";
import "./EventDelete.css";
import { FaTrashAlt } from "react-icons/fa";
import CurrentEvent from "../../../../Context/CurrentEventContext";
import { api } from "../../../../API/client";

const EventDelete = () => {
  const { currentEvent, setCurrentEvent } = useContext(CurrentEvent);

  const handleDelete = () => {
    console.log(currentEvent);
    deleteEvent();
  };

  const deleteEvent = async () => {
    const resp = await api.delete(`/delete-event.php?id=` + currentEvent.id);
    console.log(resp);
  };

  return (
    <div className="EventDelete" onClick={(e) => handleDelete(e)}>
      <FaTrashAlt className="trash" size={25} /> &nbsp; מחיקת אירוע
    </div>
  );
};

export default EventDelete;
