"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from "../../../../../../utils/constants";
import Cookies from "js-cookie";

export default function AddNotification() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [policyOptions, setPolicyOptions] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState("");
  const [loadingPolicies, setLoadingPolicies] = useState(true);
  const router = useRouter();
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchPolicies = async () => {
      setLoadingPolicies(true);
      try {
        const res = await fetch(`${API_BASE_URL}/policy/allPolicy`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setPolicyOptions(data.data || []);
        } else {
          toast.error(data.errMessage || "Failed to fetch policies");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching policies");
      } finally {
        setLoadingPolicies(false);
      }
    };

    fetchPolicies();
  }, [token]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePolicyChange = (e) => {
    setSelectedPolicy(e.target.value);
  };

  const submitForm = async () => {
    if (!title || !description || !selectedPolicy) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Description', description);
    formData.append('PolicyId', selectedPolicy);

    try {
      const res = await fetch(`${API_BASE_URL}/notification/add`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        router.push("/resource");
        toast.success(data.message || "Notification added successfully");
      } else {
        toast.error(data.errMessage || "Failed to add notification");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the notification");
    }
  };

  return (
    <section>
      <h1 className="text-2xl text-black underline mb-3 font-bold">
        Add Notification
      </h1>
      <Link href="/resource">
        <div className="mb-5 mt-5">
          <button
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="button"
          >
            Back
          </button>
        </div>
      </Link>
      <form className="mb-5">
        <div className="grid gap-4 mb-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Notification Title"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Notification Description"
              rows="4"
              required
            />
          </div>
          <div>
            <label
              htmlFor="policy"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Policy
            </label>
            <select
              id="policy"
              value={selectedPolicy}
              onChange={handlePolicyChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Select a Policy</option>
              {loadingPolicies ? (
                <option>Loading...</option>
              ) : (
                policyOptions.map(policy => (
                  <option key={policy._id} value={policy._id}>
                    {policy.PolicyName}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </form>

      <div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={submitForm}
        >
          Submit
        </button>
      </div>
    </section>
  );
}
