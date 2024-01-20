import React, { ReactNode, useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Sidebar from "../Layout/sidebar/sidebar.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type PropType = {
  children: ReactNode;
};
export default function CustomRoutes({ children }: PropType) {
  const [progress, setProgress] = useState<boolean>(false);
  const [prevLoc, setPrevLoc] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgress(true);
    if (location.pathname === prevLoc) {
      setPrevLoc("");
    }
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);
  return (
    <>
      {progress && <LoadingBar />}
      <ToastContainer />
      <div className="row row-col-2">
        {location.pathname !== "/login" && location.pathname !== "/" && (
          <div className="col-2">
            <Sidebar />
          </div>
        )}
        <div className="col p-0 ">
          <Routes>{children}</Routes>
        </div>
      </div>
    </>
  );
}
