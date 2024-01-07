import { useState } from "react";
import Header from "./components/Header";
import BookCard from "./components/BookCard";
import DeleteModal from "./components/DeleteModal";
import EditModal from "./components/EditModal";

import { toast } from "react-toastify";
import { v4 } from "uuid";

function App() {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState({});

  const handelChange = (e) => {
    //console.log(e.target.value)
    setBookName(e.target.value);
  };

  //console.log('Statedeki kitap', bookName)
  const handelSubmit = (e) => {
    e.preventDefault();
    //console.log('form fonksiyonu')

    if (!bookName) {
      toast.warn("Lütfen Kitap İsmi Girniz", { autoClose: 2000 });
      return;
    }

    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isReade: false,
    };
    //console.log("yeni kitap objesi", newBook);
    setBooks([...books, newBook]);

    toast.success("Kitap Başarıyla Eklendi", { autoClose: 2000 });
    setBookName("");
  };
  //console.log("kitap dizisi", books)

  const handelModal = (deleteBookId, deleteBookTitle) => {
    setDeleteId(deleteBookId);
    setDeleteTitle(deleteBookTitle);
    setShowDeleteModal(true);
  };

  const handelDelete = () => {
    // console.log('delete fonksiyon')

    const filteredBooks = books.filter((book) => book.id !== deleteId);
    console.log(filteredBooks);
    setBooks(filteredBooks);
    setShowDeleteModal(false);

    toast.error("Kitap Başarıyla Silindi", { autoClose: 2000 });
  };

  const handelEditModal = (editBook) => {
    //console.log('düzenleme modalı')
    setEditItem(editBook);
    setShowEditModal(true);
    //console.log(editBook)
  };

  const handelEditBook = () => {
   // console.log("edit fonksiyonu");

  const editIndex=books.findIndex((book)=>book.id===editItem.id)
  const cloneBooks=[...books]
  cloneBooks.splice(editIndex,1,editItem)
  setBooks(cloneBooks)
  setShowEditModal(false)
  toast.info('Kitap Başarıyla Güncellendi', {autoClose:2000})

  };

  //kitabı okundu olarak işaretleme
  const handelRead=(readBook)=>{
    //console.log('read fonksiyonu')
    //console.log('readBook')

    //objenin okundu bilsigisini tersine çevirme
    const updatedBook={...readBook,isRead : !readBook.isRead}
   // console.log(updatedBook)

   const index=books.findIndex((book)=>book.id ===readBook.id)

   const cloneBooks=[...books]
   cloneBooks[index]=updatedBook;
   setBooks(cloneBooks);
  }

  return (
    <div>
      <Header />

      <div className="container">
        <form className="d-flex gap-3 mt-4" onSubmit={handelSubmit}>
          <input
            value={bookName}
            onChange={handelChange}
            placeholder="Bir Kitap İsmi Giriniz"
            className="form-control shadow"
            type="text"
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>

        {books.length === 0 ? (
          <h4>Henüz Herhangi bir kitap eklenmedi.</h4>
        ) : (
          books.map((book) => (
            <BookCard
              handelEditModal={handelEditModal}
              handelModal={handelModal}
              bookInfo={book}
              key={book.id}
              handelRead={handelRead}
            />
          ))
        )}
      </div>
      {showDeleteModal && (
        <DeleteModal
          bookTitle={deleteTitle}
          handelDelete={handelDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      {showEditModal && (
        <EditModal
          handelEditBook={handelEditBook}
          editItem={editItem}
          setEditItem={setEditItem}
          setShowEditModal={setShowEditModal}
        />
      )}
    </div>
  );
}

export default App;
