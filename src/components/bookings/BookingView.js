import axios from "axios";
import { format, parseISO } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../App";
import LoadingSpinner from "../LoadingSpinner";

import {
  ApprovedByAdmin,
  RejectedByAdmin,
  RequestSent,
} from "../Steps";
const BookingsView = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [bookingData, setBookingData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const { state } = useContext(UserContext);

  //consolelog(state.userType);

  const openModal = () => {

    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setRejectionReason("");
  };


  const getbookingById = async () => {

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/bookingsView/${bookingId}`,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.booking;
      //consolelog(data);
      setBookingData(data);
      setIsLoading(false);
      //consolelog("booking wveie ")
    } catch (error) {
      navigate("/");
      //consoleerror(error);
    }
  };

  //consolelog(bookingData);

  const updateBooking = async (bookingId, isApproved) => {
    if (isApproved === "Rejected By Admin") {
      if (rejectionReason.trim() === "") {
        toast.error("Please provide a reason for rejection.");
        return;
      } else {
        setRejectionReason(null);
      }
    }
    setIsLoading(true);
    //consolelog(isApproved);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/bookingsEdit/${bookingId}`,
        {
          isApproved: isApproved,
          rejectionReason:
            isApproved === "Approved By Admin" ? null : rejectionReason,
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      // const data = response.data;
      //consolelog(data);
      closeModal();
      getbookingById();

      toast.success(`Request ${isApproved} Successfull!`);
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      //consolelog(error);
    }
  };

  const handleEditClick = (bookingId) => {
    navigate(`/bookingsEdit/${bookingId}`);
  };

 

  useEffect(() => {
    getbookingById();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="max-w-screen-md p-5 mx-auto my-10 bg-white shadow-2xl shadow-blue-200">
            <div className="mb-16 text-center">
              <p className="mt-4 text-sm leading-7 text-gray-500 uppercase font-regular">
                View Booking
              </p>
              <h3 className="text-3xl font-extrabold leading-normal tracking-tight text-gray-900 sm:text-4xl">
                View <span className="text-indigo-600">Booking </span>
              </h3>
            </div>
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-wrap mb-6 -mx-3">              
                <div className="w-full px-3 md:w-1/2">
                  <h1
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-event-name">
                    Event Name
                  </h1>
                  <p
                    className="block w-full px-4 py-3 leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-name">
                    {bookingData.eventName}
                  </p>
                </div>
              </div>
              <div className="w-full px-0 md:w-1/2">
                  <h1
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase "
                    htmlFor="grid-hall-name">
                    Hall Name
                  </h1>
                  <p
                    className="block w-full px-4 py-3 leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-hall-name">
                    {bookingData.bookedHallName}
                  </p>
                </div>
                <div>
                </div>
             

                
                <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-2 md:w-1/2">
                  <h1
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="grid-event-date">
                    Event Date Type
                  </h1>
                  <p
                    className="block w-full px-4 py-3 leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-event-date">
                    {bookingData.eventDateType === "multiple"
                      ? "Multiple Days"
                      : bookingData.eventDateType === "half"
                      ? "Half Day"
                      : "Full Day"}
                  </p>
                </div>
                </div>

              {bookingData.eventDateType === "half" && (
                <div className="flex flex-wrap mb-6 -mx-3">
                  <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <h1
                      className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase "
                      htmlFor="grid-start-time">
                      Start Time
                    </h1>
                    <p
                      className="block w-full px-4 py-3 leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-start-time">
                      {format(
                        parseISO(bookingData.startTime.slice(0, -1)),
                        "hh:mm aa"
                      )}
                    </p>
                    {/* <p className="text-xs italic text-red-500">Please fill out this field.</p> */}
                  </div>
                  <div className="w-full px-3 md:w-1/2">
                    <h1
                      className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                      htmlFor="grid-end-time">
                      End Time
                    </h1>
                    <p
                      className="block w-full px-4 py-3 leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-end-time">
                      {format(
                        parseISO(bookingData.endTime.slice(0, -1)),
                        "hh:mm aa"
                      )}
                    </p>
                  </div>
                </div>
              )}

              {bookingData.eventDateType === "multiple" && (
                <div className="flex flex-wrap mb-6 -mx-3">
                  <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <h1
                      className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase "
                      htmlFor="grid-start-time">
                      Event Start Date
                    </h1>
                    <p
                      className="block w-full px-4 py-3 leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-start-time">
                      {format(
                        new Date(bookingData.eventStartDate),
                        "EEEE dd-MM-yyyy"
                      )}
                    </p>
                  </div>
                  <div className="w-full px-3 md:w-1/2">
                    <h1
                      className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                      htmlFor="grid-end-time">
                      Event End Date
                    </h1>
                    <p
                      className="block w-full px-4 py-3 leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-end-time">
                      {format(
                        new Date(bookingData.eventEndDate),
                        "EEEE dd-MM-yyyy"
                      )}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap mb-6 -mx-3">
                {(bookingData.eventDateType === "full" ||
                  bookingData.eventDateType === "half") && (
                  <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <h1
                      className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase "
                      htmlFor="grid-department">
                      Event Date
                    </h1>
                    <p
                      className="block w-full px-4 py-3 leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-department">
                      {format(
                        new Date(bookingData.eventDate),
                        "EEEE dd-MM-yyyy"
                      )}
                    </p>
                  </div>
                )}

             
              </div>
              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <h1
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase "
                    htmlFor="grid-phone-number">
                    Phone Number
                  </h1>
                  <p
                    className="block w-full px-4 py-3 leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number">
                    {bookingData.phoneNumber}
                  </p>
                </div>
              </div>



              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <h1
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase "
                    htmlFor="grid-phone-number">
                    Requested By
                  </h1>
                  <p
                    className="block w-full px-4 py-3 leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-phone-number">
                    {bookingData.userId.name}
                  </p>
                  {/* <p className="text-xs italic text-red-500">Please fill out this field.</p> */}
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <h1
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase "
                    htmlFor="grid-alt-number">
                    Request Created At
                  </h1>
                  <p
                    className="block w-full px-4 py-3 leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-alt-number">
                    {format(
                      parseISO(bookingData.createdAt),
                      "EEEE dd-MM-yyyy hh:mm aa"
                    )}
                  </p>
                </div>
              </div>

              {bookingData.rejectionReason && (
                <div className="flex flex-wrap mb-6 -mx-3">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <h1
                      className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase "
                      htmlFor="grid-phone-number">
                      Reason For Rejection
                    </h1>
                    <p className="font-bold text-red-600 text-s">
                      {bookingData.rejectionReason}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 ">
               
                {bookingData.isApproved === "Approved By Admin" && (
                  <ApprovedByAdmin />
                )}           
                
                {bookingData.isApproved === "Rejected By Admin" && (
                  <RejectedByAdmin />
                )}
                {bookingData.isApproved === "Request Sent" && <RequestSent />}
              </div>
              <div className="flex justify-between px-5 py-5 font-bold bg-white border-gray-200 text-l">
                

                {state.userType === "admin" && (
                  <>
                    <button
                      onClick={() => handleEditClick(bookingData._id)}
                      className="px-5 py-3 leading-none text-gray-600 bg-yellow-200 rounded hover:bg-yellow-300 focus:outline-none">
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        updateBooking(bookingData._id, "Approved By Admin")
                      }
                      className="px-5 py-3 leading-none text-gray-600 bg-green-200 rounded hover:bg-green-300 focus:outline-none">
                      Approve
                    </button>
                    <button
                      onClick={() => openModal(bookingData._id)}
                      className="px-5 py-3 leading-none text-gray-600 bg-red-200 rounded hover:bg-red-300 focus:outline-none">
                      Reject
                    </button>


                  </>
                )}
                {state.userType === "hod" && (
                  <>
                    <button
                      onClick={() => handleEditClick(bookingData._id)}
                      className="px-5 py-3 leading-none text-gray-600 bg-yellow-200 rounded hover:bg-yellow-300 focus:outline-none">
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        updateBooking(bookingData._id, "Approved By HOD")
                      }
                      className="px-5 py-3 leading-none text-gray-600 bg-green-200 rounded hover:bg-green-300 focus:outline-none">
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        updateBooking(bookingData._id, "Rejected By HOD")
                      }
                      className="px-5 py-3 leading-none text-gray-600 bg-red-200 rounded hover:bg-red-300 focus:outline-none">
                      Reject
                    </button>


                  </>
                )}


              </div>
            </form>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="w-1/3 p-4 bg-white rounded-md shadow-md">
            <h2 className="mb-4 text-lg font-bold">Reason for Rejection</h2>
            <textarea
              className="w-full p-2 mb-4 border border-gray-300 rounded resize-none"
              placeholder="Enter reason for rejection"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}></textarea>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={closeModal}>
                Cancel
              </button>
              <button
                className="px-4 py-2 mr-2 text-white bg-red-500 rounded"
                // onClick={handleReject}
                onClick={() =>
                  updateBooking(bookingData._id, "Rejected By Admin")
                }>
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default BookingsView;
