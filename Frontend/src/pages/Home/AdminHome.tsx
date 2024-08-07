import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function AdminHome() {
  const [selected, setSelected] = useState(0);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const handleRowAdd = () => {
    const file = document.createElement("input");
    file.type = "file";
    const row = document.createElement("tr");
    row.classList.add("input-row");
    const tbody = document.querySelector("tbody");
    const theads = document.querySelectorAll(".books > thead > tr > th");
    Array.from(theads).slice(0, -1).forEach(() => {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.className = "form-control";
      td.appendChild(input);
      row.appendChild(td);
    });
    const td = document.createElement("td");
    const img = document.createElement("img");
    img.src = "src/assets/plus.png";
    img.style.width = "20px";
    img.style.cursor = "pointer";
    img.onclick = handleUpload
    td.appendChild(img)
    row.appendChild(td);
    const td2 = document.createElement("td");
    td2.appendChild(file)
    row.appendChild(td2)
    tbody?.appendChild(row);
  }
  const handleUpload = async () => {
      const formData = new FormData();
      formData.append("myfile", (document.querySelector("tbody > tr > td > input[type=file]") as HTMLInputElement).files![0]);
      const resopnse = await axios.post("http://localhost:3000/book/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      let filename = ""
      if(resopnse.status === 200) {
        const json = await resopnse.data;
        filename = json.filename;
      }
      const inputs = document.querySelectorAll("tbody > tr > td > input");
      const [ISBN, Title, author_name, Synopsis, pageCount, Price] = Array.from(
        inputs
      ).map((input: any) => input.value);
      await fetch("http://localhost:3000/book/addBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isbn: ISBN,
          title: Title,
          author_name,
          synopsis: Synopsis,
          pageCount,
          filepath_pdf: filename,
          price: Price,
        }),
      })
      // delete the row with className = input-row
      const tbody = document.querySelector("tbody");
      const row_to_remove = document.querySelector(".input-row")
      tbody?.removeChild(row_to_remove!);
    }
  const handleUserSave = (
    value: string,
    type: number,
    idx: number,
    oldEmail: string
  ) => {
    const rows = document.querySelectorAll("tbody > tr");
    const [username, email, password] = Array.from(rows[idx].children).map(
      (td: any) => td.innerText
    );
    let data = {};
    if (type === 1) {
      data = { username: value, email, password, oldEmail: email };
    } else if (type === 2) {
      data = { username, email: value, password, oldEmail };
    } else {
      data = { username, email, password: value, oldEmail: email };
    }
    fetch("http://localhost:3000/user/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  const handleBookEdit = (type: number, idx: number) => {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "form-control";
    const rows = document.querySelectorAll("tbody > tr");
    const td = rows[idx].children[type - 1];
    input.value = (td as HTMLInputElement).innerText;
    const oldISBN = (rows[idx].children[0] as HTMLElement).innerText;
    td.innerHTML = "";
    td.appendChild(input);
    input.onkeyup = (e: any) => {
      if (e.key === "Enter") {
        handleBookSave(e.target?.value, type, idx, oldISBN);
      }
    }
  }
  const handleBookSave = (value: string, type: number, idx: number, oldISBN: string) => {
    const rows = document.querySelectorAll("tbody > tr");
    const [ISBN, Title, author_name, Synopsis, pageCount, Price] = Array.from(
      rows[idx].children
    ).map((td: any) => td.innerText);
    const data = type===1?{isbn: value, title: Title, author_name, synopsis: Synopsis, pageCount, price: Price, oldISBN}
                :type===2?{isbn: ISBN, title: value, author_name, synopsis: Synopsis, pageCount, price: Price}
                :type===3?{isbn: ISBN, title: Title, author_name: value, synopsis: Synopsis, pageCount, price: Price}
                :type===4?{isbn: ISBN, title: Title, author_name, synopsis: value, pageCount, price: Price, oldISBN}
                :type===5?{isbn: ISBN, title: Title, author_name, synopsis: Synopsis, pageCount: value, price: Price}
                :{isbn: ISBN, title: Title, author_name, synopsis: Synopsis, pageCount, price: value}
    fetch("http://localhost:3000/book/updateBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }
  const handleUserEdit = (type: number, idx: number) => {
    const input = document.createElement("input");
    input.type = "email";
    input.className = "form-control";
    const rows = document.querySelectorAll("tbody > tr");
    const td = rows[idx].children[type - 1];
    input.value = (td as HTMLInputElement).innerText;
    const oldEmail = (rows[idx].children[1] as HTMLElement).innerText;
    td.innerHTML = "";
    td.appendChild(input);
    input.onkeyup = (e: any) => {
      if (e.key === "Enter") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(e.target?.value) && type === 2) {
          alert("Invalid email");
          return;
        }
        handleUserSave(e.target?.value, type, idx, oldEmail);
      }
    };
  };
  const handleUserDelete = (email: string) => {
    fetch("http://localhost:3000/user/deleteUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then(() => {
        setUsers(users.filter((user: any) => user.email !== email));
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  const handleBookDelete = (isbn: string) => {
    console.log(isbn)
    fetch("http://localhost:3000/book/deleteBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isbn }),
    })
      .then(() => {
        setBooks(books.filter((book: any) => book.isbn !== isbn));
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetch("http://localhost:3000/user/allUsers")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, [users]);
  useEffect(() => {
    fetch("http://localhost:3000/book/allBooks")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => console.log(err));
  }, [books]);
  return (
    <>
      <AdminNavbar setSelected={setSelected} />
      <div className="container">
        {selected === 0 ? (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any, idx: number) => (
                <tr>
                  <td onDoubleClick={() => handleUserEdit(1, idx)}>
                    {user?.username}
                  </td>
                  <td onDoubleClick={() => handleUserEdit(2, idx)}>
                    {user?.email}
                  </td>
                  <td onDoubleClick={() => handleUserEdit(3, idx)}>
                    {user?.password}
                  </td>
                  <td className="text-center">
                    {
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-danger"
                        onClick={() => handleUserDelete(user?.email)}
                      />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <button className="btn btn-success m-1 rounded-pill" onClick={handleRowAdd}><FontAwesomeIcon icon={faPlus}/></button>
            <table className="table table-hover books">
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Author Name</th>
                  <th>Synopsis</th>
                  <th>Page Number</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book: any, idx: number) => (
                  <tr>
                    <td onDoubleClick={() => handleBookEdit(1, idx)}>{book?.ISBN}</td>
                    <td onDoubleClick={() => handleBookEdit(2, idx)}>{book?.Title}</td>
                    <td onDoubleClick={() => handleBookEdit(3, idx)}>{book?.Author_name}</td>
                    <td onDoubleClick={() => handleBookEdit(4, idx)}>{book?.Synopsis}</td>
                    <td onDoubleClick={() => handleBookEdit(5, idx)}>{book?.pageCount}</td>
                    <td onDoubleClick={() => handleBookEdit(6, idx)}>{book?.Price}</td>
                    <td>
                      <FontAwesomeIcon className="text-danger" icon={faTrash} onClick = {() => handleBookDelete(book?.ISBN)}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}

export default AdminHome;
