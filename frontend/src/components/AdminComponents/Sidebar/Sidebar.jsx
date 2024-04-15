import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../Assets/logo.png";
import SidebarLinkGroup from "./SidebarLinkGroup";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen, trigger] = useState();
  // Define state or conditions to determine active links
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  return (
    <aside
      style={{ backgroundColor: "#1C2434" }}
      className="absolute left-0 top-0 z-9999 flex h-screen w-72 flex-col overflow-y-hidden duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0"
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link to="/">
          <img src={Logo} alt="Logo" width="50px" height="50px" />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!--END SIDEBAR HEADER --> */}
      {/*  SIDEBAR BODY */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-bold text-gray-500">MENU</h3>
            <ul className="mb-6 flex flex-col gap1.5">
              <li className="mb-[5px]">
                <Link
                  to="/admin-dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-gray-600 dark:hover:bg-meta-4`}
                >
                  <i className="fi fi-rr-category-alt"></i>
                  Dashboard
                </Link>
              </li>
              <li className="mb-[5px]">
                <Link
                  to="/calendar"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-gray-600 dark:hover:bg-meta-4`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z"
                      fill=""
                    />
                  </svg>
                  Calendar
                </Link>
              </li>
              <li className="mb-[5px]">
                <Link
                  to="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-gray-600 dark:hover:bg-meta-4`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                      fill=""
                    />
                    <path
                      d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                      fill=""
                    />
                  </svg>
                  Profile
                </Link>
              </li>
              <li className="mb-[5px]">
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/" || pathname.includes("dashboard")
                  }
                >
                  {(handleClick, open) => (
                    <React.Fragment>
                      <Link
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white duration-300 ease-in-out hover:bg-gray-600 dark:hover:bg-meta-4 ${
                          (pathname === "/" ||
                            pathname.includes("dashboard")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(); // Toggle the dropdown
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <i className="fi fi-rr-map-marker"></i>
                          Address
                        </div>
                        <i
                          className={`text-lg fi fi-rr-angle-small-${
                            open ? "down" : "up"
                          } ml-24`}
                        ></i>
                        {/* Dashboard link */}
                      </Link>
                      {/* Dropdown content */}
                      <div
                        className={`translate transform overflow-hidden ${
                          open ? "hidden" : ""
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            {/* Dropdown menu item */}
                            <Link
                              to="/"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "!text-white"
                              }`}
                            >
                              Regions
                            </Link>
                          </li>
                          <li>
                            {/* Dropdown menu item */}
                            <Link
                              to="/"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "!text-white"
                              }`}
                            >
                              Provinces
                            </Link>
                          </li>
                          <li>
                            {/* Dropdown menu item */}
                            <Link
                              to="/"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "!text-white"
                              }`}
                            >
                              Cities
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )}
                </SidebarLinkGroup>
              </li>
              <li className="mb-[5px]">
                <SidebarLinkGroup
                  activeCondition={
                    pathname === "/" || pathname.includes("dashboard")
                  }
                >
                  {(handleClick, open) => (
                    <React.Fragment>
                      <Link
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-white duration-300 ease-in-out hover:bg-gray-600 dark:hover:bg-meta-4 ${
                          (pathname === "/" ||
                            pathname.includes("dashboard")) &&
                          "bg-graydark dark:bg-meta-4"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(); // Toggle the dropdown
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <i className="fi fi-rr-map-marker"></i>
                          Address
                        </div>
                        <i
                          className={`text-lg fi fi-rr-angle-small-${
                            open ? "down" : "up"
                          } ml-24`}
                        ></i>
                        {/* Dashboard link */}
                      </Link>
                      {/* Dropdown content */}
                      <div
                        className={`translate transform overflow-hidden ${
                          open ? "hidden" : ""
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            {/* Dropdown menu item */}
                            <Link
                              to="/admin-dashboard/address/regions"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "!text-white"
                              }`}
                            >
                              Regions
                            </Link>
                          </li>
                          <li>
                            {/* Dropdown menu item */}
                            <Link
                              to="/admin-dashboard/address/provinces"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "!text-white"
                              }`}
                            >
                              Provinces
                            </Link>
                          </li>
                          <li>
                            {/* Dropdown menu item */}
                            <Link
                              to="/admin-dashboard/address/cities"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === "/" && "!text-white"
                              }`}
                            >
                              Cities
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )}
                </SidebarLinkGroup>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
