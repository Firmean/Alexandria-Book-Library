import UserNavbar from "../../components/UserNavbar/UserNavbar"
import { useEffect, useState } from "react"
import axios from "axios"
import ViewBook from "../../components/ViewBook/ViewBook"

function UserHome() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/book/someBooks")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <UserNavbar />
      <div className="container">
        {
          books.map((book: object ) => {
            return (<ViewBook book={book} />)
          })
        }
      </div>
    </>
  )
}

export default UserHome