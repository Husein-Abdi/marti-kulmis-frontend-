import axios from 'axios';
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
// import BookingForm from "./BookingForm";
// import {RequestSent , ApprovedByAdmin,ApprovedByHod,RejectedByAdmin,RejectedByHod} from "../Steps"
const BookingsHod = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("Request Sent");
  const [emailVerified, setEmailVerified] = useState(false);



  const userContact = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getdata`, {
        withCredentials: true, // include credentials in the request
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      //consolelog(data);

      if(data.emailVerified){
        setEmailVerified(true)
      }



      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
   
      // //consolelog(error);
      
    }
  };

  useEffect(() => {
    userContact();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getBookingData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bookingsHod`, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = response.data;
      //consolelog(data);

      const sortedBookingData = data.bookings.sort((a, b) => {
        // Convert the event date strings to Date objects and compare them
        return new Date(a.eventDate) - new Date(b.eventDate);
      });

      setBookingData(sortedBookingData);

      // setBookingData(data.bookings);
      setIsLoading(false);



      // if (response.status === 401) {
      //   toast.warn("Unauthrized Access!")
      //   navigate("/login");
      //   // throw new Error(response.error);
      // }

      // if (response.status === 401) {
      //   toast.warn("Unauthrized Access!")
      //   navigate("/login");
      // } else 


      if (response.status !== 200) {

        throw new Error(response.status);
      }
    } catch (error) {
      //consolelog(error);
      if (error.response.status === 401) {
        toast.warn("Unauthrized Access! Please Login!", {
          toastId: 'Unauthrized'
      })
        navigate("/login");
      }
      // navigate("/login");
    }
  };






  useEffect(() => {

    getBookingData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // navigate(`/bookingForm/${hallId}/${hallName}`)


  const updateBooking = async (bookingId, isApproved) => {
    setIsLoading(true);

    //consolelog(isApproved);
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/bookingsEdit/${bookingId}`, {
        isApproved: isApproved
      }, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      // const data = response.data;
      //consolelog(data);


      // setBookingData(data.bookings);
      
      getBookingData();
      // setIsLoading(false);
      toast.success(`Request ${isApproved} Successfull!`)

      if (response.status !== 200) {

        throw new Error(response.error);
      }
    } catch (error) {

      //consolelog(error);
      // navigate("/login");
    }
  };

  const handleFilter = (value) => {
    setFilterValue(value);
  };

  const filteredBookings = Object.values(bookingData).filter((bookingData) => {
    if (filterValue === "Request Sent") {
      return bookingData.isApproved === "Request Sent";
    } else if (filterValue === "Approved By HOD") {
      return bookingData.isApproved === "Approved By HOD";
    }else if (filterValue === "Approved By Admin") {
      return bookingData.isApproved === "Approved By Admin";
    }else if (filterValue === "Rejected By HOD") {
      return bookingData.isApproved === "Rejected By HOD";
    }else if (filterValue === "Rejected By Admin") {
      return bookingData.isApproved === "Rejected By Admin";
    }else {
      return bookingData
    }
  });

  // const hallId =userData.hallId
  // const hallName = userData.hallName

  // const handleBookingClick = (hallId,hallName) => {
  //   navigate('/bookingForm', { state: { hallId, hallName } });

  // };


  // const handleBookingClick = () => {
  //   sendData(data);
  // };


  const handleViewClick = (bookingId) => {
    navigate(`/bookingsView/${bookingId}`)
  };
 

  const handleEditClick = (bookingId) => {
    navigate(`/bookings/${bookingId}`)
  };

  

  return (
    <>

      <div className="min-h-screen mt-6">
        <h1 className="ml-3 text-xl font-black leading-7 text-center text-gray-800 sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl md:leading-10">
          Booking<span className="text-indigo-700"> Requests</span>  </h1>
          



          

          <div className="flex flex-wrap justify-center my-8">
          <button
            className={`rounded-full px-4 py-2 mx-4  focus:outline-none ${filterValue === "all" ? "bg-indigo-100 text-indigo-800" : "bg-white text-gray-800 hover:bg-gray-100"}`}
            onClick={() => handleFilter("all")}
          >
            All
          </button>
          <button
            className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${filterValue === "Request Sent" ? "bg-indigo-100 text-indigo-800 " : "bg-white text-gray-800 hover:bg-gray-100"}`}
            onClick={() => handleFilter("Request Sent")}
          >
            Pending
          </button>
          <button
            className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${filterValue === "Approved By HOD" ? "bg-indigo-100 text-indigo-800" : "bg-white text-gray-800 hover:bg-gray-100"}`}
            onClick={() => handleFilter("Approved By HOD")}
          >
            Forwarded To Admin
          </button>
          <button
            className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${filterValue === "Rejected By HOD" ? "bg-indigo-100 text-indigo-800" : "bg-white text-gray-800   hover:bg-gray-100"}`}
            onClick={() => handleFilter("Rejected By HOD")}
          >
            Rejected By Hod
          </button>
          <button
            className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${filterValue === "Approved By Admin" ? "bg-indigo-100 text-indigo-800" : "bg-white text-gray-800 hover:bg-gray-100"}`}
            onClick={() => handleFilter("Approved By Admin")}
          >
            Approved By Admin
          </button>
          <button
            className={`rounded-full px-4 py-2 mx-4 focus:outline-none ${filterValue === "Rejected By Admin" ? "bg-indigo-100 text-indigo-800" : "bg-white text-gray-800   hover:bg-gray-100"}`}
            onClick={() => handleFilter("Rejected By Admin")}
          >
            Rejected By Admin
          </button>
        </div>


          
          {isLoading ? (
            <LoadingSpinner />
          ) : !emailVerified ? (

      

            <div className="flex flex-col items-center justify-center my-12 ">
      
              {/* <div className="w-full lg:w-1/2"> */}
                <h1 className="my-3 text-2xl font-extrabold text-gray-800  lg:text-4xl">Looks Like Yout Have Not Verified Your Email!</h1>
                <p className="my-5 text-xl text-gray-800 ">Please click on the below button and verify email before booking.</p>
                {/* <p className="py-2 text-base text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p> */}
                <div>
      
                  <Link to="/about" ><button
                    className="w-full px-1 py-5 my-4 text-white bg-indigo-600 rounded-md lg:w-auto sm:px-16 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Verify Email
                  </button>
                  </Link>
                </div>
              {/* </div> */}
            </div>
      
          ) : (
          

            <div className="container w-full px-4 mx-auto sm:px-8 ">
            <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8 ">
              <div className="inline-block min-w-full overflow-hidden border rounded-lg shadow-xl shadow-blue-100 ">
                <table className="min-w-full leading-normal ">
                  <thead>
                    <tr className="leading-normal text-center bg-gray-200 border-gray-500">
                      <th scope="col" className="px-4 py-3 text-gray-800 uppercase border-gray-200 text-l">
                        Event Name
                      </th>
                      <th scope="col" className="px-4 py-3 text-gray-800 uppercase border-gray-200 text-l">
                        Hall Name
                      </th>
                     
                     
                      <th scope="col" className="px-4 py-3 text-gray-800 uppercase border-gray-200 text-l">
                        Event Date
                      </th>
                      <th scope="col" className="px-4 py-3 text-gray-800 uppercase border-gray-200 text-l">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3 text-gray-800 uppercase border-gray-200 text-l">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>


                    {Array.isArray(filteredBookings) && filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        // <div key={booking._id} className="my-2 ">

                        <tr key={booking._id} className="text-center border-b-2 border-gray-200 ">
                          <td className="px-5 py-5 font-bold bg-white border-gray-200 text-m">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {booking.eventName}
                            </p>
                          </td>
                          <td className="px-5 py-5 bg-white border-gray-200 text-m">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {booking.bookedHallName}

                            </p>
                          </td>
                          

                          <td className="px-5 py-5 bg-white border-gray-200 text-m">

                        {booking.eventDateType === "multiple" ? 
                            <p className="text-gray-900 whitespace-no-wrap ">
                              {format(new Date(booking.eventStartDate), "EEEE dd-MM-yyyy")}
                              <br/>To<br/>
                              {format(new Date(booking.eventEndDate), "EEEE dd-MM-yyyy")}

                            </p>

                            :
                            <p className="text-gray-900 whitespace-no-wrap">
                              {format(new Date(booking.eventDate), "EEEE dd-MM-yyyy")}
                            </p>

                            }
                          </td>



                          <td className="px-5 py-5 bg-white border-gray-200 text-m">

                            {booking.isApproved === "Approved By Admin" && (
                              // <ApprovedByAdmin />
                              <p className="font-bold text-green-600 whitespace-no-wrap">
                                {booking.isApproved}
                              </p>
                              // <p className="text-xl font-black text-green-500 text-m sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl">
                              // </p>
                            )}
                            {booking.isApproved === "Approved By HOD" && (
                              // <ApprovedByHod />
                              <p className="font-bold text-blue-600 whitespace-no-wrap">
                                {/* {booking.isApproved} */}
                                Forwarded To Admin
                              </p>
                            )}

                          {booking.isApproved === "Rejected By HOD" && (
                              <p className="font-bold text-red-900 whitespace-no-wrap">
                                {booking.isApproved}
                              </p>

                            )}

                            {booking.isApproved === "Rejected By Admin" && (
                              <p className="font-bold text-red-900 whitespace-no-wrap">
                                {booking.isApproved}
                              </p>

                            )}
                          {booking.isApproved === "Request Sent" && (
                              <p className="font-bold text-orange-600 whitespace-no-wrap">
                              {/* {booking.isApproved} */}
                                Pending
                              </p>

                            )}


                          </td>


                          <td className="px-5 py-5 bg-white border-gray-200 text-m">
                            <button onClick={() => handleViewClick(booking._id)} className="px-5 py-3 ml-5 font-bold leading-none text-gray-600 bg-gray-200 rounded text-m hover:bg-gray-300 focus:outline-none">View</button>
                            <button onClick={() => handleEditClick(booking._id)}
                              className="px-5 py-3 ml-5 font-bold leading-none text-gray-600 bg-yellow-200 rounded text-m hover:bg-yellow-300 focus:outline-none">Edit</button>
                            <button
                              onClick={() => updateBooking(booking._id, "Approved By HOD")} className="px-5 py-3 ml-5 font-bold leading-none text-gray-600 bg-green-200 rounded text-m hover:bg-green-300 focus:outline-none">Approve</button>
                            <button
                              onClick={() => updateBooking(booking._id, "Rejected By HOD")} className="px-5 py-3 ml-5 font-bold leading-none text-gray-600 bg-red-200 rounded text-m hover:bg-red-300 focus:outline-none">Reject</button>
                          </td>

                        </tr>
                        // </div>
                      ))
                    ) : (

                      <tr className="justify-center border-b border-gray-200">
                        <td className="px-5 py-5 font-bold text-center bg-white border-gray-200 text-m" colSpan="7">
                          <p className="text-gray-900 whitespace-no-wrap">
                            No Bookings Requests found.
                          </p>
                        </td>
                      </tr>


                      // <h2 className="mt-10 text-2xl font-bold text-center text-zinc-700">No Bookings Requests found.</h2>

                    )}

                  </tbody>
                </table>
              </div>
            </div>
        </div>




          )}


      </div>
    </>
  );
};

export default BookingsHod;
