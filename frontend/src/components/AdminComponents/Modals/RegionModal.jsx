import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../server";
import Swal from "sweetalert2";

const RegionModal = ({ isOpen, onClose, type, regionData,regionID, onSuccess }) => {

  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [id , setID] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      
      if (type === "create") {
        const config = { headers: { "Content-type": "multipart/form-data" } };
        const createForm = new FormData();
        createForm.append("name", name);

        axios
          .post(`${server}/region/create-region`, createForm, config)
          .then((res) => {
            Swal.fire({
              title: "Success!",
              text: "Added the new region",
              icon: "success",
            });
            setName(null);
            onClose(); // Close the modal
            onSuccess();
          })
          .catch((err)=>{
            let errors = {};
            errors["name"] = "Region already exists";
            setErrors(errors);
          });
         
      } else {
        const config = { headers: { "Content-type": "multipart/form-data" } };
        const editForm = new FormData();
        editForm.append("name", name);
        editForm.append("id", regionID);
        axios
          .put(`${server}/region/update-region`, editForm, config)
          .then((res) => {
            
            Swal.fire({
              title: "Success!",
              text: "Updated Successfully",
              icon: "success",
            });
            setName(null);
            onClose(); // Close the modal
            onSuccess();
          });
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!name) {
      errors["name"] = "Name is required";
      isValid = false;
    } 
    if(name.length <= 1 ){
      errors["name"] = "Name should be 2 letters or more";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  useEffect(() => {
    if (regionData && regionData.name ) {
      setName(regionData.name);
    }
    if(regionID && regionID.regionID){
      setID(regionID.regionID);
    }
  }, [regionData, regionID]);
  

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-md max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {type === "create" ? "Add new region" : "Edit region"}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 md:p-5" noValidate>
              <input type="hidden" name="regionID" value={regionID} />
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                      errors["name"] ? "border-red-500" : ""
                    }`}
                    placeholder="Type region name"
                    required
                  />
                  {errors["name"] && (
                    <p className="text-red-500 text-sm mt-1">{errors["name"]}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
              >
                {type === "create" ? "Add new region" : "Save changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegionModal;
