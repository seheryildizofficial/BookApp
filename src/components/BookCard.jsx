import React from "react";

const BookCard = ({ bookInfo,handelModal,handelEditModal,handelRead }) => {
  // console.log(props);
  const { title, date, isRead,id }=bookInfo;

  return (
    <div className="d-flex justify-content-between align-items-center p-3 border rounded shadow mt-5">
      <div>
        <h5
          style={{ 
            textDecoration: isRead ? "line-through" : "none"
         }}
        >
          {title}
        </h5>
        <p>{date}</p>
      </div>

      <div className="btn-group">
        <button onClick={()=>handelModal(id,title)} className="btn btn-danger">Sil</button>
        <buttton onClick={()=>handelEditModal(bookInfo)} className="btn btn-primary">Düzenle</buttton>
        <button onClick={()=>handelRead(bookInfo)} className="btn btn-success">
          {isRead === true ? "Okundu" : "Okunmadı"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
