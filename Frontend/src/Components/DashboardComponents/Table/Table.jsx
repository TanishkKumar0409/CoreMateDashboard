import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Table({ values, more }) {
  const location = useLocation();
  const path = location.pathname;

  const heading = [
    "Id",
    "image",
    "Name",
    "Email",
    "Phone No",
    "Course",
    "Action",
  ];

  return (
    <div className="table-responsive">
      <table className="table text-start align-middle table-bordered table-hover mb-0">
        <thead>
          <tr className="text-theme">
            {heading &&
              heading.map((item, index) => (
                <th scope="col" key={index}>
                  {item}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {values && values.length > 0 ? (
            (path === "/" ? values.slice(0, 5) : values.slice(0, more)).map(
              (item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/${item.profile}`}
                      width={"50px"}
                      height={"50px"}
                      alt=""
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>{item.course}</td>
                  <td className="text-center">
                    <Link to={`/view/${item.id}`} className="btn btn-red">
                      View User {item.id}
                    </Link>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan={heading.length}
                className="text-center fs-1 fw-semibold"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
