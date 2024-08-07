const express = require("express");
const db = require("../connection.js");
const router = express.Router();
const multer = require("multer");
const path = require("path");
// const fs = require('fs');

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, "BOOK-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  // limits: { fileSize: 1000000 },
}).single("myfile");

const obj = (req, res, next) => {
  try {
    upload(req, res, () => {
      next();
    });
  } catch (error) {
    console.log("obj", error);
  }
};

router.get("/allBooks", (req, res) => {
  db.query(`SELECT * FROM books`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/someBooks", (req, res) => {
  db.query(`SELECT * FROM books ORDER BY RAND() LIMIT 10`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.post("/addBook", (req, res) => {
  const { isbn, title, author_name, synopsis, pageCount, filepath_pdf, price } =
    req.body;
  db.query(
    `INSERT INTO books (ISBN, Title, Author_name, Synopsis, pageCount, filepath_pdf, price) VALUES ('${isbn}', '${title}', '${author_name}', '${synopsis}', ${pageCount}, '${filepath_pdf}', ${price})`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send({ message: "Book Added" });
      }
    }
  );
});

router.post("/upload", upload, async (req, res) => {
  res.status(200).send({ filename: req.file.filename });
});
router.post('/deleteBook', (req, res) => {
    const { isbn } = req.body;
    db.query(`DELETE FROM books WHERE ISBN = '${isbn}'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send({ message: "Book Deleted" });
        }
    });
})
router.post('/updateBook', (req, res) => {
    const { 
            isbn, 
            title, 
            author_name, 
            synopsis, 
            pageCount, 
            filepath_pdf, 
            price,
            oldISBN
        } = req.body;
    db.query(`UPDATE books SET ISBN = '${isbn}', Title = '${title}', author_name = '${author_name}', Synopsis = '${synopsis}', pageCount = ${pageCount}, filepath_pdf = '${filepath_pdf}', price = ${price} WHERE ISBN = '${oldISBN?oldISBN:isbn}'`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send({ message: "Book Updated" });
        }
    });
})

router.post("/deleteBook", (req, res) => {
  const { isbn } = req.body;
  db.query(`DELETE FROM books WHERE ISBN = '${isbn}'`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ message: "Book Deleted" });
    }
  });
});

module.exports = router;
