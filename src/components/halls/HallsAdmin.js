import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
// import BookingForm from "./BookingForm";

const HallsAdmin = () => {
  const navigate = useNavigate();
  const [hallData, setHallData] = useState({});
    const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [authStatus, setAuthStatus] = useState("");
  const [showModal,setShowModal]=useState(false);
  const [selectedHallId, setSelectedHallId] = useState("");
  const [selectedHallName, setSelectedHallName] = useState("");

  const callAboutPage = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/about`, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const data = response.data;
      //consolelog(data);
      setUserData(data);
      // console.log(data);
      setIsLoading(false);
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.warn("Unauthrized Access! Please Login!", {
          toastId: 'Unauthrized'
      })
        navigate("/login");
      }
    }
  };
  

  const getHallsData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/halls`, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = response.data;
      // console.log(data);
      setHallData(data.halls);
      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      // console.log(error);
      // navigate("/login");
    }
  };



  useEffect(() => {
  callAboutPage()
    getHallsData();

  }, )


  
  const handleDeleteClick = async (hallId) => {
    // e.preventDefault();


    try {
      const response = await axios.delete (
        `${process.env.REACT_APP_SERVER_URL}/halls/${hallId}`,

        {
          withCredentials: true, // To include credentials in the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (!data) {
        toast.error("Request not send!")
        // console.log("Message not send");
      } else {
        getHallsData();
        toast.success("Hall Deleted Successfull!")
        // alert("Message send");
        setShowModal(false);
        setSelectedHallId("");
        setSelectedHallName("");
        navigate("/halls")
        // setBookingData({ ...bookingData });
      }
    } catch (error) {
      if (error.response.status === 422 && error.response) {
        
      } else {
        console.error(error);
      }
      // console.log(error);
    }
  };


  const handleBookingClick = (hallId, hallName) => {
    navigate(`/bookingForm/${hallId}/${hallName}`)
  };

  const handleEditClick = (hallId, hallName) => {
    navigate(`/halls/${hallId}/${hallName}`)
  };


  // const hallId =hallData.hallId
  // const hallName = hallData.hallName

  // const handleBookingClick = (hallId,hallName) => {
  //   navigate('/bookingForm', { state: { hallId, hallName } });

  // };


  // const handleBookingClick = () => {
  //   sendData(data);
  // };
  const handleDeleteModal = (hallId, hallName) => {
    setSelectedHallId(hallId);
    setSelectedHallName(hallName);
    setShowModal(true);
  };

  return (
<>{isLoading ? (
          <LoadingSpinner />
        ) : 
    <div className="min-h-screen mt-6"> 
    
   <div className="container flex items-center justify-between px-6 py-5 mx-auto md:py-0">
   <div className="mx-auto ">
    <h1 className="ml-3 text-xl font-black leading-7 text-center text-gray-800 sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl md:leading-10">
   Available <span className="text-indigo-700"> Halls</span>  </h1>

   </div>
   <Link to="/hallForm">
            <button className="flex self-end py-1 text-sm text-indigo-700 transition duration-150 ease-in-out bg-transparent border border-indigo-700 rounded focus:outline-none lg:text-lg lg:font-bold focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 md:block hover:bg-gray-200 sm:px-8 sm:py-3">
              Create Hall</button>
          </Link>
   </div>

      {Array.isArray(hallData) && hallData.length > 0 ? (
        hallData.map((hall) => (
          <div key={hall._id} className="my-2 ">
            <div className="flex items-center justify-center w-full">
              <div className="w-full p-12 bg-white shadow-2xl rounded-xl shadow-blue-200 md:w-8/12 lg:w-8/12">

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                 

                  <div className="col-span-1 lg:col-span-9">
                    <div className="text-center lg:text-left">
                      <h2 className="text-2xl font-bold text-zinc-700">{hall.name}</h2>
                      
                    </div>



                    <div className="grid grid-cols-2 gap-6 mt-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">Location</p>
                      </div>

                      <div>
                        <p className="font-semibold text-m text-zinc-700">{hall.location}</p>
                      </div>
                    </div>



                    <div className="grid grid-cols-2 gap-6 mt-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">Capacity</p>
                      </div>

                      <div>
                        <p className="font-semibold text-m text-zinc-700">{hall.capacity}</p>
                      </div>
                    </div>


                    <div className="grid grid-cols-2 gap-6 mt-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">price</p>
                      </div>

                      <div>
                        <p className="font-semibold text-m text-zinc-700">{hall.price}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">Description</p>
                      </div>

                      <div>
                        <p className="font-semibold text-m text-zinc-700">{hall.description}</p>
                      </div>
                    </div>









                    <div className="grid grid-cols-3 gap-4 mt-6">
                      {/* <Link to={`/bookingForm`}> */}
                      <button className="w-full px-3 py-2 font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white"
                        onClick={() => handleBookingClick(hall._id, hall.name)}
                      >
                        Book Now
                      </button>
                {userData.email === process.env.REACT_APP_MASTER_ADMIN_EMAIL || userData.email === hall.hallCreater  ? 
                <>
                      <button className="w-full px-3 py-2 font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white"
                        onClick={() => handleEditClick(hall._id, hall.name)}
                      >
                        Edit Hall
                      </button>

                      <button className="w-full px-3 py-2 font-semibold text-red-500 bg-white border-2 border-red-500 rounded-xl hover:bg-red-500 hover:text-white"
                        // onClick={() => handleDeleteClick(hall._id, hall.name)}
                        // onClick={() => setShowModal(true)} 
                        onClick={() =>
                          handleDeleteModal(hall._id, hall.name)
                        }
                        >
                        Delete Hall
                      </button>
                        </>

                    : <></>}
                      {/* </Link> */}
                      {/* <button className="w-full px-3 py-2 font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-xl hover:bg-blue-500 hover:text-white">
                  View Profile
                </button> */}
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
        

      
        

        ))
      ) : (
        <h2 className="mt-10 text-2xl font-bold text-center text-zinc-700">No halls found.</h2>

      )}

      </div>
}

  
{/* 
      {
        showModal &&
              
        <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
            <div class="bg-white px-16 py-14 rounded-md text-center">
              <h1 class="text-xl mb-4 font-bold text-slate-500">Do you Want Delete</h1>
              <button onClick={() => handleDeleteClick(hall._id, hall.name)} class="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">Ok</button>
              <button onClick={() => setShowModal(false)} class="bg-red-500 px-4 py-2 rounded-md text-md text-white">Cancel</button>
            </div>
          </div>
        
      } */}

{showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="px-8 py-6 bg-white rounded-lg">
            <h2 className="mb-4 text-lg font-bold">
              Are you sure you want to delete {selectedHallName}?
            </h2>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                onClick={() =>
                  handleDeleteClick(selectedHallId)
                }
              >
                Delete
              </button>
              <button
                className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
        </>
  );
  
};

export default HallsAdmin;
