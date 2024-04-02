import "./AddModal.css";

function AddModal(props) {
    const handleAddAttendee = (e) => {
        e.preventDefault();
        props.closeModal(false);
    };

    return (
        <div className="addModal">
            <form>
                <h3 className="formHeading">הוספת נוכח</h3>
                <label>
                    <span>שם פרטי</span>
                    <input type="text" name="" id="" />
                </label>
                <label>
                    <span>שם משפחה</span>
                    <input type="text" name="" id="" />
                </label>
                <label>
                    <span>תעודת זהות</span>
                    <input type="text" name="" id="" />
                </label>
                <div className="btns">
                    <input
                        className="btn btn-primary submit"
                        type="submit"
                        value="אישור"
                    />
                    <button
                        className="btn btn-secondary"
                        onClick={(e) => handleAddAttendee(e)}
                    >
                        ביטול
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddModal;
