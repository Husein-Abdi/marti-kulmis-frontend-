import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
// import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
// import BookingForm from "./BookingForm";

const Events = () => {
  // const navigate = useNavigate();
  const [eventData, setEventData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getEventData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/events`,
        {
          // withCredentials: true, // include credentials in the request
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data.bookings;
      //consolelog(data);

      const sortedEventData = data.sort((a, b) => {
        // Convert the event date strings to Date objects and compare them
        return new Date(a.eventDate) - new Date(b.eventDate);
      });

      setEventData(sortedEventData);

      // setEventData(data.bookings);
      setIsLoading(false);

      

      if (response.status !== 200) {
        throw new Error(response.status);
      }
    } catch (error) {
 
    }
  };

  useEffect(() => {
    getEventData();
  }, []);

  return (
    <>
      <div className="min-h-screen mt-6">
        <h1 className="ml-3 text-xl font-black leading-7 text-center text-gray-800 sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl md:leading-10">
          Upcomming<span className="text-indigo-700"> Events</span>{" "}
        </h1>
        {isLoading ? (
          <LoadingSpinner />
        ) : Array.isArray(eventData) && eventData.length ? (
          eventData.map((event) => (
            <>
              <div
                key={event._id}
                className="flex flex-col items-center justify-center my-10 ">
                <div className="relative flex flex-col items-center p-8 mx-auto bg-white shadow-2xl rounded-xl shadow-blue-200 md:w-8/12 lg:w-10/12">
                  <div className="w-full mt-8 mb-8">
                    <h4 className="px-2 text-2xl font-bold text-navy-500 ">
                      {event.eventName}
                    </h4>
                  </div>
                  <div className="grid w-full grid-cols-3 gap-4 px-2 max-md:grid-cols-1">
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                      <p className="font-bold text-gray-600 text-m">
                        Event Venue
                      </p>
                      <p className="text-base font-medium text-navy-700 ">
                        {event.bookedHallName}
                      </p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                      <p className="font-bold text-gray-600 text-m">Location</p>
                      <p className="text-base font-medium text-navy-700 ">
                        {event.bookedHall.location}
                      </p>
                    </div>

                    

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                      <p className="font-bold text-gray-600 ext-m">
                        Event Date Type
                      </p>
                      <p className="text-base font-medium text-navy-700 ">
                        {event.eventDateType === "multiple"
                          ? "Multiple Days"
                          : event.eventDateType === "half"
                          ? "Half Day"
                          : "Full Day"}
                      </p>
                    </div>

                    {(event.eventDateType === "full" ||
                      event.eventDateType === "half") && (
                      <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="font-bold text-gray-600 ext-m">
                          Event Date
                        </p>
                        <p className="text-base font-medium text-navy-700 ">
                          {format(new Date(event.eventDate), "EEEE dd-MM-yyyy")}
                        </p>
                      </div>
                    )}

                    {event.eventDateType === "half" && (
                      <>
                        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p className="font-bold text-gray-600 ext-m">
                            Starts At
                          </p>
                          <p className="text-base font-medium text-navy-700 ">
                            {format(
                              parseISO(event.startTime.slice(0, -1)),
                              "hh:mm aa"
                            )}
                          </p>
                        </div>

                        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p className="font-bold text-gray-600 ext-m">
                            Ends At
                          </p>
                          <p className="text-base font-medium text-navy-700 ">
                            {format(
                              parseISO(event.endTime.slice(0, -1)),
                              "hh:mm aa"
                            )}
                          </p>
                        </div>
                      </>
                    )}

                    {event.eventDateType === "multiple" && (
                      <>
                        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p className="font-bold text-gray-600 ext-m">
                            Event Start Date
                          </p>
                          <p className="text-base font-medium text-navy-700 ">
                            {format(
                              new Date(event.eventStartDate),
                              "EEEE dd-MM-yyyy"
                            )}
                          </p>
                        </div>

                        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                          <p className="font-bold text-gray-600 ext-m">
                            Event End Date
                          </p>
                          <p className="text-base font-medium text-navy-700 ">
                            {format(
                              new Date(event.eventEndDate),
                              "EEEE dd-MM-yyyy"
                            )}
                          </p>
                        </div>
                      </>
                    )}

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                      <p className="font-bold text-gray-600 ext-m">
                        Name 
                      </p>
                      <p className="text-base font-medium text-navy-700 ">
                        {event.eventManager}
                      </p>
                    </div>

                      
                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                      <p className="font-bold text-gray-600 ext-m">Phone</p>
                      <p className="text-base font-medium text-navy-700 ">
                        {event.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <h2 className="mt-10 text-2xl font-bold text-center text-zinc-700">
            No Upcomming Events.
          </h2>
        )}
      </div>
    </>
  );
};

export default Events;
