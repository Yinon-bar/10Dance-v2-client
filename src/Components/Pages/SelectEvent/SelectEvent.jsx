import { useContext, useEffect, useState } from "react";
import HeaderEventSelect from "../../Header/HeaderEventSelect/HeaderEventSelect";
import EventCard from "./EventCard/EventCard";
import "./SelectEvent.css";
import { api } from "../../../API/client";
import ClearScreen from "../../../Context/ClearScreen";

const SelectEvent = () => {
  const [allEvents, setAllEvents] = useState([]);
  const { clearScreen, setClearScreen } = useContext(ClearScreen);

  const getAllEvents = async () => {
    try {
      const resp = await api.get("/get-all-events.php");
      setAllEvents(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, [clearScreen]);

  return (
    <>
      <HeaderEventSelect />
      <div className="SelectEvent">
        <div className="container">
          <h1 className="title">אנא בחר אירוע להצגה</h1>
          <div className="eventsList">
            {allEvents.map((singleEvent) => (
              <EventCard key={singleEvent.id} event={singleEvent} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectEvent;
