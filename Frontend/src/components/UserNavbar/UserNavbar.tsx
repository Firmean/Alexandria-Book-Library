import styles from "./UserNavbar.module.css";

function UserNavbar() {
  function handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div className="" id={`${styles.outerwrapper}`}>
      <div className="container">
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <b>Project Alexandria</b>
            </a>

            <button
              className="btn"
              id={styles.name}
              onDoubleClick={handleLogout}
            >
              {localStorage.getItem("username")}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default UserNavbar;
