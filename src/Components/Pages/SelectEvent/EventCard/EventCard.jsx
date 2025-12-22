import "./EventCard.css";
import logo from "../../../../assets/img/uni_logo.png";

const EventCard = ({ event }) => {
  const handleEventSelect = (e) => {
    console.log("ddddddddddd");
  };

  return (
    <div className="EventCard" onClick={(e) => handleEventSelect(e)}>
      <div className="logo" style={{ backgroundImage: `url(${logo})` }}></div>
      <div className="title">
        <h2>{event.name}</h2>
        <h3>{event.created_at}</h3>
      </div>
    </div>
  );
};

export default EventCard;
