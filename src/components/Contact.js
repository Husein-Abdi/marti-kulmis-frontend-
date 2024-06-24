import React from "react";
const Contact = () => {
  return (
    <div className="flex flex-wrap items-center justify-center w-full min-h-screen">
      <div className="w-full p-12 mx-auto bg-white shadow-2xl rounded-xl shadow-blue-200 md:w-8/12 lg:w-5/12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-1 lg:col-span-9">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-zinc-700">
                Marti-Kulmis Hall Booking System
              </h2>
            </div>

            <div className="grid items-center grid-cols-3 gap-8 mt-6 text-center lg:text-left">
              <div>
                <p className="font-bold text-zinc-700">Call Center</p>
              </div>

              <div>
                <p className="font-semibold text-m text-zinc-700">
                  0618632207
                </p>
              </div>
              
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
