import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import UserHome from "./pages/Home/UserHome";
import AdminHome from "./pages/Home/AdminHome";

const App = () => {
  return (
    <Routes>
        <Route path="/" element={ <Login /> }></Route> 
        <Route path="/signup" element={ <Signup /> }></Route>
        <Route path="/userHome" element={ <UserHome /> }></Route>
        <Route path="/adminHome" element={ <AdminHome /> }></Route>
        {/* <Route path="/login" element={ <Login /> }></Route> */}
    </Routes>
  );
}

export default App;