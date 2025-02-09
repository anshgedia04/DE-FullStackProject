import { Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import { Route } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Login from "./components/Login";
import Contact from "./pages/Contact";
import { useSelector } from "react-redux";
import About from "./pages/About";
import SignUp from "./components/SignUp";
import Forgotpass from "./pages/Forgotpass";
import ClientPending from "./components/Tracker/ClientPending";
import ClientDispatch from "./components/Tracker/ClientDispatch";
import ClientDelivered from "./components/Tracker/ClientDelivered";
import AdminPending from "./components/AdminTracker/AdminPending";
import AdminDispatch from "./components/AdminTracker/AdminDispatch";
import AdminDelivered from "./components/AdminTracker/AdminDelivered";



const App = () => {
  const {user} = useSelector((state) => state.auth)

  return (<div className="">
        <div className="bg-slate-900 ">
          <Navbar/>
        </div>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/contactus" element={<Contact></Contact>} />
          <Route path="/aboutus" element={<About></About>} /> 
          <Route path="/signup" element={<SignUp></SignUp>} />
          <Route path="/forgot-password" element={<Forgotpass></Forgotpass>} /> 
          <Route path="/pending" element={<ClientPending></ClientPending>}></Route>
          <Route path="/dispatch" element={<ClientDispatch></ClientDispatch>}></Route>
          <Route path="/delivered" element={<ClientDelivered></ClientDelivered>}></Route>
          <Route path="/AdminPending" element={<AdminPending></AdminPending>}></Route>
          <Route path="/AdminDispatched" element={<AdminDispatch></AdminDispatch>}></Route>
          <Route path="/AdminDelivered" element={<AdminDelivered></AdminDelivered>}></Route>
        </Routes>
  </div>)
};

export default App;
