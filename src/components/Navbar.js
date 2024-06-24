import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import logo from '../assets/logo.png';


const Navbar = () => {
  const { state } = useContext(UserContext)

  // const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    //consolelog("toggle called");
    document.getElementById('menu').classList.toggle('hidden');
    
    // setShowMenu(!showMenu);
  };
  //consolelog(state);

// const dashboard = userType.charAt(0).toUpperCase() + userType.slice(1);
// //consolelog(dashboard); 

// "Admin"

const RenderUser = () => {
  if (state.userType === "admin") {
    return (
      <div>
        <Link to="/halls">Halls</Link>
      </div>
    );
  } else if (state.userType === "user") {
    return (
      <div>
        <Link to="/bookings">Bookings</Link>
      </div>
    );
  } else {
    return (
      <div>
        <Link to="/halls">Halls</Link>
      </div>
    );
  }
};
// const jwtoken = getCookie('jwtoken');


  const RenderMenu = () => {

    if (state.user) {
        
      return (
        <>

          {/* <Link to="/logout" className="mr-5 hover:text-gray-900">Logout</Link> */}
          <Link to="/logout">
            <button className="px-8 py-1 text-sm text-indigo-700 transition duration-150 ease-in-out bg-transparent border border-indigo-700 rounded focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 md:block hover:bg-gray-200 sm:py-3">Logout</button>
          </Link>
        </>
      )
    } else {

      return (

        <>
        
          <Link to="/login">
            <button className="px-8 py-1 text-sm font-bold text-indigo-700 transition duration-150 ease-in-out bg-transparent border border-indigo-700 rounded focus:outline-none lg:text-lg focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 md:block hover:bg-gray-200 sm:py-3">Sign In / Sign Up</button>
          </Link>
          {/* <button className="hidden py-1 text-sm text-indigo-700 transition duration-150 ease-in-out bg-transparent border border-indigo-700 rounded focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 md:block hover:bg-gray-200 sm:px-8 sm:py-3">Sign In</button> */}

          {/* <Link to="/login" className="mr-5 hover:text-gray-900">Login</Link>
            <Link to="/signup" className="mr-5 hover:text-gray-900">Sign Up</Link> */}
        </>
      )
    }
  }


  return (<>

    <nav className="w-full border-b">
      <div className="container flex items-center justify-between px-6 py-5 mx-auto md:py-0">
          <Link to={"/"}>
        <div aria-label="Home. logo" className="flex items-center justify-between" role="img">
          {/* <h1>asd</h1> */}
           {/* <img className="w-12 md:w-auto" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/centre_aligned_simple-Svg1.svg" alt="logo" /> */}
                      <img className="w-24  md:w-64" src={logo} alt="logo" />

             {/* <h1 className="ml-3 text-xl font-black leading-7 text-center text-gray-800 sm:border-l-2 sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl md:leading-10">
               Book  <span className="text-indigo-700">It</span> </h1>
          */}
        </div>
          </Link>

        <div>
          <button onClick={toggleMenu} className="text-gray-500 sm:block md:hidden hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
            <svg aria-haspopup="true" aria-label="open Main Menu" xmlns="http://www.w3.org/2000/svg" className="md:hidden icon icon-tabler icon-tabler-menu" width="32" height="32" viewBox="0 0 32 32" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round">
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <line x1="4" y1="8" x2="20" y2="8"></line>
              <line x1="4" y1="16" x2="20" y2="16"></line>
              <line x1="4" y1="24" x2="20" y2="24"></line>
            </svg>
          </button>
          <div id="menu" className="hidden md:block lg:block">
            <button onClick={toggleMenu} className="fixed top-0 z-30 block mt-6 text-gray-500 md:hidden lg:hidden hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
              <svg aria-label="close main menu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
                
              </svg>
            </button>
            
            <ul onClick={toggleMenu} className="fixed top-0 bottom-0 left-0 right-0 z-20 flex flex-col items-center justify-center py-10 text-3xl bg-white md:text-base md:flex md:flex-row md:relative md:bg-transparent">
            

              <li className="pt-10 text-base text-gray-700 cursor-pointer hover:text-gray-900 lg:text-lg md:pt-0">
                <Link to="/">Home</Link>
              </li>


              <li className="pt-10 text-base text-gray-700 cursor-pointer hover:text-gray-900 lg:text-lg md:pt-0 md:ml-5 lg:ml-10">
                <Link to="/events">Events</Link>
              </li>

              <li className="pt-10 text-base text-gray-700 cursor-pointer hover:text-gray-900 lg:text-lg md:pt-0 md:ml-5 lg:ml-10">
                <Link to="/calendar">Calendar</Link>
              </li>

              <li className="pt-10 text-base text-gray-700 cursor-pointer hover:text-gray-900 lg:text-lg md:pt-0 md:ml-5 lg:ml-10">
                {/* <Link to="/bookings">Bookings</Link> */}
                <RenderUser/>
              </li>

              <li className="pt-10 text-base text-gray-700 cursor-pointer hover:text-gray-900 lg:text-lg md:pt-0 md:ml-5 lg:ml-10">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="pt-10 text-base text-gray-700 cursor-pointer hover:text-gray-900 lg:text-lg md:pt-0 md:ml-5 lg:ml-10">
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </div>
        </div>
        <RenderMenu />

        

      </div>
    </nav>







  </>

  )
};

export default Navbar;
