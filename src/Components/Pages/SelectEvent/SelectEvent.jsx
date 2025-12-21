import HeaderEventSelect from "../../Header/HeaderEventSelect/HeaderEventSelect";
import EventCard from "./EventCard/EventCard";
import "./SelectEvent.css";

const SelectEvent = () => {
  return (
    <>
      <HeaderEventSelect />
      <div className="SelectEvent">
        <div className="container">
          <h1>אנא בחר אירוע להצגה</h1>
          <div className="eventsList">
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectEvent;
