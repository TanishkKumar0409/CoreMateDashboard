import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="bg-sec-custom rounded-top p-4">
          <div className="row">
            <div className="col-12 col-sm-6 text-center text-sm-start">
              <h6>
                &copy; <Link to="/">CoreMate</Link>, All Right Reserved.
              </h6>
            </div>
            <div className="col-12 col-sm-6 text-center text-sm-end">
              <h6>
                Designed By <Link to="/">Tanishk Kumar</Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
