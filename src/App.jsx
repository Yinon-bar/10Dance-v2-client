import { useState } from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import AuthContext from "./Context/AuthContext";
import CurrentEvent from "./Context/CurrentEventContext";

function App() {
  const [currentEvent, setCurrentEvent] = useState([]);

  return (
    // <AuthContext.Provider value={{ name: userName }}>
    <CurrentEvent.Provider
      value={{
        currentEvent: currentEvent,
        setCurrentEvent: setCurrentEvent,
      }}
    >
      <div className="App">
        <Main />
      </div>
    </CurrentEvent.Provider>
    // </AuthContext.Provider>
  );
}

export default App;
