import axios from "axios";
import { createContext, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import PasswordReset from "./components/auth/PasswordReset";
import Signup from "./components/auth/Signup";
import BookingForm from "./components/bookings/BookingForm";
import BookingsAdmin from "./components/bookings/BookingsAdmin";
import Bookinguser from "./components/bookings/BookingsUser";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import UserDashboard from "./components/dashboard/UserDashboard";
import HallForm from "./components/halls/HallForm";
import Halls from "./components/halls/Halls";
import HallsAdmin from "./components/halls/HallsAdmin";
import HallsEdit from "./components/halls/HallsEdit";
import { initialState, reducer } from "./reducer/UseReducer";

import { CalendarView } from "./components/CalendarView";
import Unauthorized from "./components/Unauthorized";
import ForgotPassword from "./components/auth/ForgotPassword";
import VerifySuccess from "./components/auth/VerifySuccess";
import BookingUpdateFrom from "./components/bookings/BookingUpdateForm";
import BookingsView from "./components/bookings/BookingView";
import Events from "./components/bookings/Events";
export const UserContext = createContext();
const App = () => {

  
      const token = (localStorage.getItem("jwtoken"))

      //consolelog(token); 
      // axios.defaults.headers.common["authorization"] = token.split("=")[1];;
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
      // axios.defaults.headers["authorization"] = token;
      axios.defaults.withCredentials = true;
    // }, []);
    
    const [state, dispatch] = useReducer(reducer, initialState)



  return (

    <>

      <UserContext.Provider value={{ state, dispatch }}>


        <Navbar />
        <Routes>
        <Route path="/" element={state.userType === "admin" ? <AdminDashboard /> : state.userType === "user" ? <UserDashboard /> : <Login />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/profile" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/passwordReset" element={<PasswordReset />} />
          <Route path="/forgotPassword/:id/:token" element={<ForgotPassword />} />
          <Route path="/events" element={<Events />} />

          <Route path="/verifyEmail/:id/:token" element={<VerifySuccess/>} />       
          
          <Route path="/halls" element={state.userType === "admin" ? <HallsAdmin/> : <Halls />}/>
          <Route exact path="/halls/:hallId/:hallName" element={state.userType === "admin" ?<HallsEdit /> : <Unauthorized />} />
          <Route exact path="/bookingsEdit/:bookingId" element={state.userType === "admin" ? <BookingUpdateFrom/>  : process.env.REACT_APP_HOD_FEATURE &&  state.userType === "user" ? <BookingUpdateFrom/>  : <Unauthorized />} />
          
          
          <Route path="/hallForm" element={state.userType === "admin" ?<HallForm /> : <Unauthorized />} />

          <Route path="/bookings" element={state.userType === "admin" ? <BookingsAdmin/> : state.userType === "user" ? <Bookinguser/> :  process.env.REACT_APP_HOD_FEATURE && state.userType === "user" ? <Bookinguser/>  : <Unauthorized />} />
          <Route exact path="/bookingForm/:hallId/:hallName" element={<BookingForm />} />
          {/* <Route path="/bookings" element={<Booking/>} /> */}

          <Route exact path="/bookingsView/:bookingId" element={<BookingsView/>} />
   

          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <Footer/>
      </UserContext.Provider>


      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
