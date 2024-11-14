import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function View() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchData = await fetch(`http://localhost:5000/api/user/${id}`);
        const jsonData = await fetchData.json();

        setData([jsonData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [id]);

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/user/delete/${id}`
        );
        Navigate("/manage-user");
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    } else {
      toast.info("Delete action was canceled.");
    }
  };

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="bg-sec-custom text-center rounded p-4">
          {data.map((item, index) => (
            <div className="row" key={index}>
              <div className="col-md-5">
                <img
                  src={`http://localhost:5000/${item.profile}`}
                  alt=""
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-md-7 p-5">
                <h3>User Details</h3>
                <div className="table-responsive">
                  <table className="table text-start align-middle table-bordered table-hover mb-0">
                    <tbody>
                      <tr>
                        <th className="fs-3">Id</th>
                        <td className="fs-3">{item.id}</td>
                      </tr>
                      <tr>
                        <th className="fs-3">Name</th>
                        <td className="fs-3">{item.name}</td>
                      </tr>
                      <tr>
                        <th className="fs-3">Email</th>
                        <td className="fs-3">{item.email}</td>
                      </tr>
                      <tr>
                        <th className="fs-3">Phone</th>
                        <td className="fs-3">{item.contact}</td>
                      </tr>
                      <tr>
                        <th className="fs-3">Course</th>
                        <td className="fs-3">{item.course}</td>
                      </tr>
                      <tr>
                        <td colSpan={"2"}>
                          <div className="btn-group w-100">
                            <Link
                              to={`/update-user/${item.id}`}
                              className="btn btn-red btn-lg"
                            >
                              Update
                            </Link>
                            <button
                              className="btn btn-red btn-lg"
                              onClick={handleDelete}
                            >
                              Delete
                            </button>
                            <Link
                              to={`/manage-user`}
                              className="btn btn-red btn-lg"
                            >
                              Back
                            </Link>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
