import React from "react";
import Results from "./Results/Result";
import Attendance from "./Attendance/Attendance";

export default function Graphs() {
  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <Results />
          <Attendance />
        </div>
      </div>
    </>
  );
}
