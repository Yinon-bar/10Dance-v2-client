import { useState } from "react";
import AuthContext from "../../Context/AuthContext";
import Routing from "../Routing/Routing";
import "./Main.css";

function Main() {
  const [userFromDb, setUserFromDb] = useState();

  return (
    <AuthContext.Provider value={{ userFromDb, setUserFromDb }}>
      <div className="Main">
        <Routing />
      </div>
    </AuthContext.Provider>
  );
}

export default Main;
