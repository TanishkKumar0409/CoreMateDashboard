import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Stats from "../../Components/DashboardComponents/Stats/Stats";
import Graphs from "../../Components/DashboardComponents/Graphs/Graphs";
import Extras from "../../Components/DashboardComponents/Extras/Extras";
import Table from "../../Components/DashboardComponents/Table/Table";
import { FileAPI } from "../../Services/API/API";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [courseStats, setCourseStats] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await FileAPI.get("/user/all");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const courseData = data.reduce((acc, user) => {
      const { course } = user;

      if (!acc[course]) {
        acc[course] = { count: 0 };
      }

      acc[course].count += 1;
      return acc;
    }, {});

    setCourseStats(courseData);
  }, [data]);

  return (
    <>
      <Stats courseStats={courseStats} />
      <Graphs />
      <div className="container-fluid pt-4 px-4">
        <div className="bg-sec-custom text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">All Students</h6>
            <Link to="/dashboard/user/all">Show All</Link>
          </div>

          <Table values={data} />
        </div>
      </div>
      <Extras />
    </>
  );
}
