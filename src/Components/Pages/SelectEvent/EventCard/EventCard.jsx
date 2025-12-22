import "./EventCard.css";
import logo from "../../../../assets/img/uni_logo.png";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleEventSelect = (event) => {
    console.log(event);
    localStorage.setItem("Current Event", JSON.stringify(event));
    navigate(`/admin/${event.id}`);
  };

  return (
    <div className="EventCard" onClick={(e) => handleEventSelect(event)}>
      <div className="logo" style={{ backgroundImage: `url(${logo})` }}></div>
      <div className="title">
        <h2>{event.name}</h2>
        <h3>{event.created_at}</h3>
      </div>
    </div>
  );
};

export default EventCard;
