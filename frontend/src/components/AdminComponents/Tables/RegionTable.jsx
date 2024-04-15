import React, { useState, useEffect } from "react";
import RegionModal from "../Modals/RegionModal.jsx";
import { Link } from "react-router-dom";
import { server } from "../../../server.js";
import Swal from "sweetalert2";
import axios from "axios";
const RegionTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [regionToEdit, setRegionToEdit] = useState(null);
  const [regionData, setRegionData] = useState([]);
  const [regionID,setRegionIDToEdit] = useState("");
  
  const fetchRegions = async () => {
    try {
      const response = await fetch(`${server}/region/regions-list`);
      if (!response.ok) {
        throw new Error("Failed to fetch regions");
      }
      const data = await response.json();
      console.log(data);
      setRegionData(data);
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  const openModal = (region) => {
    if (region) {
      setRegionToEdit(region);
      setRegionIDToEdit(region._id); // Set the regionIDToEdit state
    } else {
      setRegionToEdit(null);
      setRegionIDToEdit(null); // Clear regionIDToEdit if opening modal for creating new region
    }
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setRegionToEdit(null);
    setModalOpen(false);
  };

  const handleSuccess = () => {
    fetchRegions(); // Refresh the table
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Warning",
      text: "Do you want to delete this? This action cannot be undone.",
      icon: "warning",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const config = { headers: { "Content-type": "multipart/form-data" } };
        const deleteData = new FormData();
        deleteData.append("id", id);
        axios
        .delete(`${server}/region/delete/${id}`, config)
        .then((res) => {
          fetchRegions();
          Swal.fire({
            title: "Success!",
            text: "Successfully deleted the region",
            icon: "success",
          });
        })
        
        .catch((error) => {
          console.error("Error deleting region:", error);
          // Handle error, if any
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  useEffect(() => {
    fetchRegions();
  }, []);
  
  

  return (
    <>
      <RegionModal
        isOpen={modalOpen}
        onClose={closeModal}
        type={regionToEdit ? "edit" : "create"}
        regionData={regionToEdit}
        regionID={regionID}
        onSuccess={handleSuccess}
      />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <h1>Region list</h1>
          {/* Button to open the modal */}
          <Link
            to="#"
            onClick={() => openModal(null)} // Pass null for creating new region
            className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-1 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mt-2"
          >
            Button
          </Link>
          <table className="w-full table-auto" id="regionTable">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
               ID
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Name
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
            <tbody>
              {regionData.map((regionItem, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white ">
                      {regionItem._id}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{regionItem.name}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={() => openModal(regionItem)}
                        className="hover:text-primary"
                      >
                        <i class="fi fi-rr-edit"></i>
                      </button>
                      <button className="hover:text-danger"
                        onClick={() => handleDelete(regionItem._id)}
                      >
                        <i class="fi fi-rr-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RegionTable;
