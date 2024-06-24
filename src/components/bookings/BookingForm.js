import axios from "axios";
import { parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";

import notVerified from "../../assets/notVerified.jpg";
const BookingForm = () => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const { hallId, hallName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    userId: "",
    eventManager: "",
    eventName: "",
    eventDateType: "",
    eventDate: "",
    eventStartDate: "",
    eventEndDate: "",
    startTime: "",
    endTime: "",
    email: "",
    userType: "",
    bookedHallId: hallId,
    bookedHallName: hallName,
    phoneNumber: "",
    isApproved: "",
  });

  const userContact = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/getdata`,
        {
          withCredentials: true, // include credentials in the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      //consolelog(data);

      let status;
      if (data.userType === "admin") {
        status = "Approved By Admin";
      } else if (data.userType === "hod") {
        status = "Approved By HOD";
      }

      if (data.emailVerified) {
        setEmailVerified(true);
      }

      setBookingData({
        ...bookingData,
        userId: data._id,
        eventManager: data.name,
        email: data.email,
        userType: data.userType,
        isApproved: status,
        // phoneNumber: data.phone,
      });

      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      // //consolelog(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    userContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle change here

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBookingData({ ...bookingData, [name]: value });
    console.log(bookingData);
  };


  // send to backend

  const bookingForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const {
      eventManager,
      userId,
      eventName,
      eventDateType,
      eventDate,
      eventStartDate,
      eventEndDate,
      startTime,
      endTime,
      email,
      userType,
      bookedHallId,
      bookedHallName,
      phoneNumber,
      isApproved,
    } = bookingData;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/bookings`,
        {
          eventManager,
          userId,
          eventName,
          eventDate,
          eventDateType,
          eventStartDate,
          eventEndDate,
          startTime: parseISO(`2000-01-01T${startTime}:00.000Z`),
          endTime: parseISO(`2000-01-01T${endTime}:00.000Z`),
          email,
          userType,
          bookedHallId,
          bookedHallName,
          phoneNumber,
          isApproved,
        },
        {
          withCredentials: true, // To include credentials in the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.message === "Booking created successfully") {
        toast.success("Booking created successfully!");
        navigate("/bookings");
      } else {
        toast.error("Request not sent!");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          const data = error.response.data;
          // Handle validation errors
          // You can set specific error messages for different fields if needed
          if (data && data.error) {
            const errorMessage = data.error;
            setAuthStatus(errorMessage);
            toast.error(errorMessage);
          }
        } else if (error.response.status === 403) {
          toast.error("Unauthorized request!");
        } else {
          console.error(error);
          toast.error("An error occurred while creating the booking.");
        }
      } else {
        console.error(error);
        toast.error("An error occurred while creating the booking.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : !emailVerified ? (
        <div className="flex flex-col items-center justify-center gap-16 px-6 lg:flex-row py-28 md:px-24 md:py-20 lg:py-32 lg:gap-28">
          <div className="w-full lg:w-1/3">
           
            <img alt="error" className="hidden lg:block" src={notVerified} />
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="py-4 text-3xl font-extrabold text-gray-800 lg:text-4xl ">
              Looks Like Yout Have Not Verified Your Email!
            </h1>
            <p className="py-4 text-xl text-gray-800">
              Please click on the below button and verify email before booking.
            </p>
            <div>
              <Link to="/profile">
                <button className="w-full px-1 py-5 my-4 text-white bg-indigo-600 rounded-md lg:w-auto sm:px-16 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Verify Email
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="max-w-screen-md p-5 mx-auto my-10 bg-white shadow-2xl shadow-blue-200">
            <div className="mb-16 text-center">
              <p className="mt-4 text-sm leading-7 text-gray-500 uppercase font-regular">
                Book Hall
              </p>
              <h3 className="text-3xl font-extrabold leading-normal tracking-tight text-gray-900 sm:text-4xl">
                Book Your <span className="text-indigo-600">Hall </span>Now
              </h3>
            </div>

            <form method="POST" className="w-full">
              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase "
                    htmlFor="grid-event-manager"
                  >
                    Event Coordinator Name
                  </label>
                  <input
                    className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-manager"
                    type="text"
                    value={bookingData.eventManager}
                    name="eventManager"
                    onChange={handleInputs}
                    placeholder="Event Coordinator Name"
                  />
                </div>
                


                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-event-name"
                  >
                    Event Name
                  </label>
                  <input
                    value={bookingData.eventName}
                    name="eventName"
                    onChange={handleInputs}
                    className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-name"
                    type="text"
                    placeholder="Event Name"
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase "
                    htmlFor="grid-phone-number"
                  >
                    Phone Number
                  </label>
                  <input
                    className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number"
                    type="number"
                    value={bookingData.phoneNumber}
                    name="phoneNumber"
                    onChange={handleInputs}
                    placeholder="Phone Number"
                  />
                </div>

                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase "
                    htmlFor="grid-hall-name"
                  >
                    Hall Name
                  </label>
                  <input
                    className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-300 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-hall-name"
                    type="text"
                    value={bookingData.bookedHallName}
                    name="bookedHallName"
                    onChange={handleInputs}
                    placeholder="Hall Name"
                    disabled
                  />
                </div>
              </div>

              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-event-date-type"
                  >
                    Event Date Type
                  </label>

                  <select
                    className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="eventDateType"
                    name="eventDateType"
                    value={bookingData.eventDateType}
                    onChange={handleInputs}
                  >
                    <option value="">Select</option>
                    <option value="half">Half Day</option>
                    <option value="full">Full Day</option>
                    <option value="multiple">Multiple Days</option>
                  </select>
                </div>
              </div>

              {bookingData.eventDateType === "multiple" && (
                <div className="flex flex-wrap mb-6 -mx-3">
                  <div className="w-full px-3 md:w-1/2">
                    <label
                      className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                      htmlFor="grid-event-date"
                    >
                      Event Start Date
                    </label>
                    <input
                      value={bookingData.eventStartDate}
                      name="eventStartDate"
                      onChange={handleInputs}
                      className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-event-date"
                      type="date"
                      placeholder="Event Date"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="w-full px-3 md:w-1/2">
                    <label
                      className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                      htmlFor="grid-event-start-date"
                    >
                      Event End Date
                    </label>
                    <input
                      value={bookingData.eventEndDate}
                      name="eventEndDate"
                      onChange={handleInputs}
                      className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-event-end-date"
                      type="date"
                      placeholder="Event Date"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-wrap mb-6 -mx-3">
                {(bookingData.eventDateType === "full" ||
                  bookingData.eventDateType === "half") && (
                  <div className="w-full px-3 md:w-1/2">
                    <label
                      className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                      htmlFor="grid-event-date"
                    >
                      Event Date
                    </label>
                    <input
                      value={bookingData.eventDate}
                      name="eventDate"
                      onChange={handleInputs}
                      className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-event-date"
                      type="date"
                      placeholder="Event Date"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                )}
              </div>

              {bookingData.eventDateType === "half" && (
                <div className="flex flex-wrap mb-6 -mx-3">
                  <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <label
                      className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase "
                      htmlFor="grid-start-time"
                    >
                      Start Time
                    </label>
                    <input
                      className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-start-time"
                      type="time"
                      value={bookingData.startTime}
                      name="startTime"
                      onChange={handleInputs}
                      placeholder="Start Time"
                    />
                  </div>
                  <div className="w-full px-3 md:w-1/2">
                    <label
                      className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                      htmlFor="grid-end-time"
                    >
                      End Time
                    </label>
                    <input
                      value={bookingData.endTime}
                      name="endTime"
                      onChange={handleInputs}
                      className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-end-time"
                      type="time"
                      placeholder="End Time"
                    />
                  </div>
                </div>
              )}

             


             

              <div className="my-4">
                <p className="font-bold text-red-600 text-s">{authStatus}</p>
              </div>

              <div className="flex flex-wrap mb-6 -mx-3">
               
                <div className="flex justify-between w-full px-3">
                  <button
                    // onClick={handleConfirmModal}
                    onClick={bookingForm}
                    className="px-6 py-2 font-bold text-white bg-indigo-600 rounded shadow hover:bg-indigo-400 focus:shadow-outline focus:outline-none"
                    type="submit"
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingForm;
