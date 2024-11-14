import React, { useState, useEffect } from "react";

export default function ToDoList() {
  const [task, setTask] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim() && hours.trim() && minutes.trim()) {
      setTasks([
        ...tasks,
        {
          name: task,
          completed: false,
          hours: parseInt(hours),
          minutes: parseInt(minutes),
        },
      ]);
      setTask("");
      setHours("");
      setMinutes("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const formatTime = (hours, minutes) => {
    let timeString = "";
    if (hours > 0) {
      timeString += `${hours} hr${hours > 1 ? "s" : ""}`;
    }
    if (minutes > 0) {
      if (hours > 0) timeString += " ";
      timeString += `${minutes} min${minutes > 1 ? "s" : ""}`;
    }
    return timeString;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) => {
        return prevTasks.map((taskItem) => {
          if (!taskItem.completed) {
            if (taskItem.minutes > 0) {
              taskItem.minutes -= 1;
            } else if (taskItem.hours > 0) {
              taskItem.hours -= 1;
              taskItem.minutes = 59;
            }

            if (taskItem.hours === 0 && taskItem.minutes === 0) {
              taskItem.completed = true;
            }
          }
          return taskItem;
        });
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <div className="col-sm-12 col-md-6 col-xl-4">
      <div
        className="h-100 bg-sec-custom rounded p-4"
        style={{ maxHeight: "360px", overflow: "auto" }}
      >
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h6 className="mb-0 text-theme">To Do List</h6>
        </div>
        <div className="d-flex mb-2 input-group">
          <input
            type="text"
            placeholder="Enter Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-control custom-placeholder bg-dark border-0"
          />
          <input
            type="number"
            placeholder="Hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-control custom-placeholder bg-dark border-0 custom-group"
          />
          <input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-control custom-placeholder bg-dark border-0 custom-group"
          />
          <button className="btn btn-red ms-2" onClick={handleAddTask}>
            Add
          </button>
        </div>

        {tasks.map((taskItem, index) => (
          <div
            key={index}
            className="d-flex align-items-center border-bottom py-2"
          >
            <span>{index + 1}</span> {/* Serial number for task */}
            <div className="w-100 ms-3">
              <div className="d-flex w-100 align-items-center justify-content-between">
                <span
                  style={{
                    textDecoration: taskItem.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {taskItem.name}
                </span>
                <span className="ms-3">
                  {formatTime(taskItem.hours, taskItem.minutes)}
                </span>

                <div>
                  <button
                    className="btn btn-sm btn-red ms-2"
                    onClick={() => handleDeleteTask(index)}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
