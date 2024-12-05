"use client";
import LoadingScreen from "@/app/components/common/Loading";
// import html2pdf from "html2pdf.js";
import React, { useRef, useState } from "react";

const Modal = ({ isOpen, onClose, data, kyc }) => {
  // const contentRef = useRef();
  // const handleDownload = () => {
  //   if (typeof window !== "undefined") {
  //     const element = contentRef.current;

  //     var opt = {
  //       image: { type: "jpeg", quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  //     };
  //     if (data) {
  //       html2pdf().from(element).set(opt).save("download.pdf");
  //     }
  //   }
  // };
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  console.log(data);
  console.log(kyc);

  // Check if both kyc and data are empty
  const isNoDataAvailable =
    (!kyc || Object.keys(kyc).length === 0) && (!data || data.length === 0);

  // useEffect(() => {
  //   handleDownload();
  // }, []);

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
        onClick={(e) => e.stopPropagation()}
      >
        <div
          // ref={contentRef}
          className="relative bg-white rounded-lg shadow dark:bg-gray-700"
        >
          <div className="flex items-center justify-between p-4 md:p-5 mx-10 rounded-t dark:border-gray-600">
            <div>
              <h1 className="text-black text-4xl font-semibold">
                Know Your Compliance
              </h1>
              <p className="text-gray-900 w-3/5">
                Your go-to tool for effortlessly navigating the complex
                landscape of labour laws applicable to your establishment.
              </p>
            </div>
            <img src="/images/logoWIthoutBg.png" className="w-32 h-32" />
          </div>
          <div className="border-b"></div>
          <div className=" text-black font-semibold text-xl pt-6 px-14">
            <span className="text-gray-500 text-3xl">" </span>Thank you for
            choosing Know Your Compliance. We’re here to help you stay compliant
            and focus on what matters most your business!{" "}
            <span className="text-gray-500 text-3xl">"</span>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            {/* Check if there is no data */}
            {isNoDataAvailable ? (
              <div className="text-center text-lg text-red-600">
                No data available
              </div>
            ) : (
              <>
                {/* If kyc exists, display the KYC table */}
                {kyc ? (
                  <div className="overflow-x-auto">
                    <div>
                      <table className="min-w-full border border-gray-300 text-black text-start">
                        <thead>
                          <tr>
                            <th className="border p-2 w-1/3">
                              Name Of Organization
                            </th>
                            <td className="border border-gray-300 p-2">
                              {kyc.NameOfOrganization}
                            </td>
                          </tr>
                          <tr>
                            <th className="border border-gray-300 p-2">
                              Date Of Commencement
                            </th>
                            <td className="border border-gray-300 p-2">
                              {new Date(
                                kyc.DateOfCommenceMent
                              ).toLocaleDateString("en-IN")}
                            </td>
                          </tr>
                          <tr>
                            <th className="border border-gray-300 p-2">
                              GST Number
                            </th>
                            <td className="border border-gray-300 p-2">
                              {kyc.GSTNumber}
                            </td>
                          </tr>
                          <tr>
                            <th className="border border-gray-300 p-2">
                              Type Of Industry
                            </th>
                            <td className="border border-gray-300 p-2">
                              {kyc.TypeOfIndustry}
                            </td>
                          </tr>
                          <tr>
                            <th className="border border-gray-300 p-2">
                              State Of Operations
                            </th>
                            <td className="border border-gray-300 p-2">
                              {kyc.StateOfOperations.join(", ")}
                            </td>
                          </tr>
                          <tr>
                            <th className="border border-gray-300 p-2">
                              Employee Count
                            </th>
                            <td className="border border-gray-300 p-2">
                              {kyc.EmployeeCount}
                            </td>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                ) : null}

                {/* <button
                  onClick={handleDownload}
                  className="border p-2 rounded-md border-gray-400 text-blue-600"
                >
                  Download PDF
                </button> */}

                {/* Display the data table if data is available */}
                <div className="overflow-x-auto">
                  {data && data.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                            S. No.
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Act Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Compliance Frequency
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-60 ">
                            Remark
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item, key) => (
                          <tr key={key}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {key + 1}
                            </td>
                            <td className="px-8 py-4 text-sm font-medium text-gray-900 text-nowrap md:text-wrap ">
                              {item.ActName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.ComplianceFrequency}
                            </td>
                            <td className="px-8 py-4 text-sm text-gray-500">
                              {console.log(item.State)}
                              {item.remark == "This Law valid for "
                                ? "-"
                                : item.remark}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
