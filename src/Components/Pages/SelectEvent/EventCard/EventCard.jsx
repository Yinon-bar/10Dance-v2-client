import "./EventCard.css";
import logo from "../../../../assets/img/uni_logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BiSolidCalendarEdit } from "react-icons/bi";
import ConfirmDelete from "../../Admin/EventDelete/ConfirmDelete/ConfirmDelete";

const EventCard = ({ event }) => {
  const [showDeleteScreen, setShowDeleteScreen] = useState(false);

  const navigate = useNavigate();

  const handleEventSelect = (event) => {
    console.log(event);
    localStorage.setItem("Current Event", JSON.stringify(event));
    navigate(`/admin/${event.id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    console.log("לא מנווט");
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowDeleteScreen(true);
    console.log("לא מנווט");
  };

  return (
    <>
      {showDeleteScreen && (
        <ConfirmDelete event={event} onClose={setShowDeleteScreen} />
      )}
      <div className="EventCard" onClick={(e) => handleEventSelect(event)}>
        <div className="actions">
          <button
            className="btn-round delete"
            onClick={(e) => {
              handleDelete(e);
            }}
          >
            <FaTrashAlt
              className="trashIcon"
              size="20"
              color={"var(--color-red)"}
            />
          </button>
          <button className="btn-round edit" onClick={(e) => handleEdit(e)}>
            <BiSolidCalendarEdit size={24} color={"var(--color-bgLight)"} />
          </button>
        </div>
        <div className="logo" style={{ backgroundImage: `url(${logo})` }}></div>
        <div className="title">
          <h2>{event.name}</h2>
          <h3>{event.created_at}</h3>
        </div>
      </div>
    </>
  );
};

export default EventCard;
