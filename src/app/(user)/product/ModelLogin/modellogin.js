import React, { useState } from 'react';
import styles from './Modal.module.css'; // Update or remove this if not needed
import MyForm from '../KYC/KYC';
import OtpLogin from '../OtpLogin/otplogin';

const Modal = ({ isOpen, onClose }) => {
    const [accepted, setAccepted] = useState(false);

    const handleClose = () => {
        // Reset the accepted state when closing
        setAccepted(false);
        onClose();
    };

    const handleAccept = () => {
        setAccepted(true);
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={handleClose}
            id="default-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 right-0 left-0 z-50 w-full h-full max-h-full overflow-y-auto overflow-x-hidden flex justify-center items-center bg-transparent/[.8]"
        >
            <div
                className="relative p-4 w-full max-w-7xl max-h-full"
                onClick={e => e.stopPropagation()}
            >
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {accepted ? "KYC Form" : "Sign In"}
                        </h3>
                        <button
                            onClick={handleClose}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        {accepted ? (
                            <MyForm />
                        ) : (
                            <OtpLogin />
                        )}
                    </div>
                    {!accepted && (
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                onClick={handleAccept}
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                I accept
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                Decline
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
