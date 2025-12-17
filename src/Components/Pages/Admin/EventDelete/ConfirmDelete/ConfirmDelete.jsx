import "./ConfirmDelete.css";

const ConfirmDelete = () => {
  return (
    <div className="ConfirmDelete">
      <h2>האם אתה בטוח שברצונך למחוק את האירוע?</h2>
      <div className="btns">
        <button>כן להמשיך</button>
        <button>ביטול</button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
