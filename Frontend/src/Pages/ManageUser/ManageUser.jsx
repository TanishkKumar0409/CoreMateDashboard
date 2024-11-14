import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../Components/DashboardComponents/Table/Table";

export default function ManageUser() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [more, setMore] = useState(10);
  const [none, setNone] = useState("d-none");

  useEffect(() => {
    const getData = async () => {
      const fetchData = await fetch("http://localhost:5000/api/user/all");
      const jsonData = await fetchData.json();
      setData(jsonData);
    };
    getData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const filteredValues = data.filter((item) => {
    const matchesSearchTerm =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contact?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse = selectedCourse
      ? item.course?.toLowerCase() === selectedCourse.toLowerCase()
      : true;

    return matchesSearchTerm && matchesCourse;
  });

  const handleData = () => {
    setMore(more + 10);
  };

  useEffect(() => {
    if (filteredValues.length <= more) {
      setNone("d-none");
    } else {
      setNone("");
    }
  }, [filteredValues, more]);

  return (
    <>
      <div className="container pt-4 px-4">
        <div className="bg-sec-custom text-center rounded p-4 d-flex input-group">
          <input
            type="text"
            className="form-control custom-placeholder"
            placeholder="Search by Name, Email, Phone"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select
            name="course"
            id="course"
            className="form-control custom-group"
            onChange={handleCourseChange}
            value={selectedCourse}
          >
            <option value="">All Courses</option>
            {Array.from(new Set(data.map((item) => item.course))).map(
              (course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      <div className="container-fluid pt-4 px-4">
        <div className="bg-sec-custom text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="mb-0 text-theme">Manage User</h5>
            <Link to="/add-user">Add User</Link>
          </div>

          <Table values={filteredValues.slice(0, more)} />

          <button className={`btn btn-red ${none} mt-4`} onClick={handleData}>
            Show More
          </button>
        </div>
      </div>
    </>
  );
}
