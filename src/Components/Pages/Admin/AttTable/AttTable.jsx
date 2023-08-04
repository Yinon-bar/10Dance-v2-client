import "./AttTable.css";

function AttTable(props) {
    // console.log(props.attendee);
    return (
        <div className="AttTable">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>תעודת זהות</th>
                        <th>שם פרטי</th>
                        <th>שם משפחה</th>
                        <th>מוסד לימודים</th>
                        <th>נוכח</th>
                    </tr>
                </thead>
                <tbody>
                    {props.attendee.map((att) => (
                        <tr key={att.id}>
                            <td>{att.id}</td>
                            <td>{att.tz_id}</td>
                            <td>{att.fName}</td>
                            <td>{att.lName}</td>
                            <td>{att.institute}</td>
                            <td>{att.isArrived}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AttTable;
