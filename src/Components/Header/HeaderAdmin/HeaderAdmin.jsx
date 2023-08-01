import "./HeaderAdmin.css";

function HeaderAdmin() {
    return (
        <div className="HeaderAdmin">
            <div className="container">
                <div className="content">
                    <h3>שלום ינון בר</h3>
                    <div className="btn-group">
                        <button className="btn btn-primary">
                            יצירת אירוע חדש
                        </button>
                        <button className="btn btn-primary">
                            למסך קבלת פנים
                        </button>
                        <button className="btn btn-primary">אודות</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderAdmin;
