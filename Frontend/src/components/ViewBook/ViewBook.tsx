import styles from "./ViewBook.module.css";
import axios from "axios";

interface Props {
  book: object;
}

function ViewBook({ book }: Props) {

  const openBook = () => {
    window.open(`http://localhost:3000/uploads/${book.filepath_pdf}`)
  };

  return (
    <div className="row" id={styles.outerwrapper}>
      <div className="col-1" style={{ textAlign: "center" }}>
        <img src="src/assets/book.png" alt="Book" id={styles.bookicon} />
      </div>
      <div className="col-11">
        <h4>
          <b>{book.Title}</b>
        </h4>
        <p>
          <b>Author:</b> <i>{book.Author_name}</i>
        </p>
        <p>{book.Synopsis}</p>
        <p>
          <b>ISBN:</b> <i>{book.ISBN}</i>
        </p>
        <p>
          <b>Pages:</b> {book.pageCount}
        </p>
        <p>
          <b>Price:</b> {book.Price}
        </p>
        <button className="btn btn-success" onClick={openBook}>
          Read the book
        </button>
      </div>
    </div>
  );
}

export default ViewBook;
