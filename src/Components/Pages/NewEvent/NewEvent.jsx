import HeaderAdmin from "../../Header/HeaderAdmin/HeaderAdmin";
import "./NewEvent.css";

function NewEvent() {
    return (
        <div className="NewEvent">
            <HeaderAdmin />
            <div className="container">
                <div className="content">
                    <h2 className="primary">יצירת אירוע חדש</h2>
                    <form action="">
                        <label>
                            שם האירוע
                            <input type="text" name="" id="" />
                        </label>
                        <label>
                            כותרת האירוע (יופיע במסך קבלת הפנים)
                            <input type="text" name="" id="" />
                        </label>
                        <label>
                            העלאת לוגו האירוע
                            <input type="file" name="" id="" />
                        </label>
                        <label>
                            יש לצרף קובץ בפורמט Excel, Csv
                            <input type="file" name="" id="" />
                        </label>
                        <input
                            className="btn btn-primary"
                            type="submit"
                            value="צור אירוע"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewEvent;
