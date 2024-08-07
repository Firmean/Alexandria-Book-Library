import styles from "./AdminNavbar.module.css"
type AdminNavbarProps = {
  setSelected: (selected: number) => void
}
const AdminNavbar = ({setSelected}: AdminNavbarProps) => {
  function handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div className="" id={`${styles.outerwrapper}`}>
      <div className="container">
        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
              <a className="navbar-brand" href="#"><b>Project Alexandria</b></a>

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-center">
                <ul className="navbar-nav m-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#" onClick={ () => setSelected(0)}>Manage Users</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => setSelected(1)}>Manage Books</a>
                  </li>
                </ul>
              </div>

              <button className="btn" id={styles.name} onDoubleClick={handleLogout}>
                {localStorage.getItem("username")}
              </button>
            </div>
        </nav>
      </div>
    </div>
  )
}

export default AdminNavbar