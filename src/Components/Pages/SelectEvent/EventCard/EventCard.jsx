import "./EventCard.css";
import logo from "../../../../assets/img/uni_logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BiSolidCalendarEdit } from "react-icons/bi";

const EventCard = ({ event }) => {
  const [showBtns, setShowBtns] = useState(false);
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

  return (
    <div
      className="EventCard"
      onMouseEnter={() => setShowBtns(true)}
      onMouseLeave={() => setShowBtns(false)}
      onClick={(e) => handleEventSelect(event)}
    >
      <div className="actions">
        <button
          className="btn-round delete"
          onClick={(e) => {
            handleEdit(e);
          }}
        >
          <FaTrashAlt
            className="trashIcon"
            size="20"
            color={"var(--color-red)"}
          />
        </button>
        <button className="btn-round edit">
          <BiSolidCalendarEdit size={24} color={"var(--color-bgLight)"} />
        </button>
      </div>
      <div className="logo" style={{ backgroundImage: `url(${logo})` }}></div>
      <div className="title">
        <h2>{event.name}</h2>
        <h3>{event.created_at}</h3>
      </div>
    </div>
  );
};

export default EventCard;
