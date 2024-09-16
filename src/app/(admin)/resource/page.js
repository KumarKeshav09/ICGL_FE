"use client";
import { useState, useEffect } from "react";
import Tabs from "./tabs/tabs";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Ensure that this is imported for toast notifications
import Policy from "./Policy/Policy";

// Popup component definition
function Popup({
  isOpen,
  title,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 mx-auto max-w-md">
        <div className="relative bg-white rounded-lg shadow-md">
          <button
            onClick={onCancel}
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <h3 className="mb-5 mr-2 text-lg font-normal text-gray-500">{title}</h3>
            <button
              onClick={onConfirm}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              {confirmLabel}
            </button>
            <button
              onClick={onCancel}
              data-modal-hide="popup-modal"
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {cancelLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Resource component definition
export default function Resource() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Popup confirm and cancel handlers
  const handleConfirm = () => {
    toast.success("Action confirmed!");
    setIsPopupOpen(false);
  };

  const handleCancel = () => {
    toast.info("Action cancelled!");
    setIsPopupOpen(false);
  };

  useEffect(() => {
    // Import Flowbite only on the client side
    import("flowbite").then((module) => {
      const { initFlowbite } = module;
      initFlowbite();
    });
  }, []);

  return (
    <section>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <h1 className="text-2xl text-black underline mb-3 font-bold">
          Resource
        </h1>
      </div>
      <Tabs />
      {/* <Policy /> */}
    </section>
  );
}
