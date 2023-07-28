import "./Main.css";
import { useState } from "react";
import ListNumpad from "../NumPad/ListNumpad/ListNumpad";
import NumberContext from "../../Context/NumberContext";
import axios from "axios";

function Main() {
    const [inputValue, setInputValue] = useState("");
    const [isPending, setIsPending] = useState(false);
    const sendId = (e) => {
        e.preventDefault();
        const tzId = e.target.elements.tzId.value;
        // console.log(e.target.elements.tzId.value);
        setIsPending(true);
        setTimeout(() => {
            axios
                .get("http://localhost:3001/api/attendees/" + tzId, {
                    headers: { "Content-Type": "application/json" },
                })
                .then((resp) => {
                    console.log(resp.data);
                    setIsPending(false);
                })
                .catch((err) => console.log(err));
        }, 1000);
    };

    const insertToInput = (e) => {
        console.log(e);
        setInputValue(e);
    };

    return (
        <NumberContext.Provider
            value={{ inputValue: inputValue, setInputValue: setInputValue }}
        >
            {isPending && (
                <div className="loading">
                    <h1>טוען</h1>
                </div>
            )}
            <div className="Main">
                <div className="title wrapper">
                    <div className="title-section">
                        <h1 className="title welcome">ברוכים הבאים</h1>
                        <h1 className="title campus">
                            יום אוריינטציה לעובדים חדשים
                        </h1>
                        <h1 className="title welcome">האוניברסיטה העברית</h1>
                    </div>
                </div>
                <h2 className="title cta">
                    נא הכנס ת.ז. מלאה <span className="without">כולל</span> ספרת
                    ביקורת
                </h2>
                <form onSubmit={sendId}>
                    <input
                        onChange={(e) => insertToInput(e.target.value)}
                        className="input-text"
                        type="text"
                        value={inputValue}
                        name="tzId"
                    />
                    <div className="numpad">
                        <ListNumpad />
                    </div>
                </form>
            </div>
        </NumberContext.Provider>
    );
}

export default Main;
