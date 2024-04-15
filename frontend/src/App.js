import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  AdminDashboardPage,
  RegionPage,
  HomePage,
  ProvincePage,
  CityPage,
} from "./Routes.js";
import DefaultLayout from "./layout/DefaultLayout.jsx";
import PageTitle from "./components/PageTitle.jsx";
import "./index.css";
import { useEffect } from "react";
import axios from "axios";

import { loadUser } from "./redux/actions/user.js";
import Store from "./redux/store.js";
function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Shopluxe" />
              <HomePage />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Login" />
              <LoginPage />
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <PageTitle title="Signup" />
              <SignupPage />
            </>
          }
        />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />

        <Route
          path="/admin-dashboard"
          element={
            <DefaultLayout>
              <PageTitle title="Admin Dashboard" />
              <AdminDashboardPage />
            </DefaultLayout>
          }
        />
        <Route
          path="/admin-dashboard/address/regions"
          element={
            <DefaultLayout>
              <RegionPage />
            </DefaultLayout>
          }
        />

        <Route
          path="/admin-dashboard/address/provinces"
          element={
            <DefaultLayout>
              <ProvincePage />
            </DefaultLayout>
          }
        />

        <Route
          path="/admin-dashboard/address/cities"
          element={
            <DefaultLayout>
              <CityPage />
            </DefaultLayout>
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
        theme="dark" // Fix: transition should be a string value
      />
    </BrowserRouter>
  );
}

export default App;
