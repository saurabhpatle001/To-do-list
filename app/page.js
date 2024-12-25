"use client";
import React, { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return; 
    setMainTask([...mainTask, { title, desc, isDone: false }]); // Add isDone to task
    setTitle(""); 
    setDesc(""); 
  };

  const deleteTask = (index) => {
    setMainTask(mainTask.filter((_, i) => i !== index));
  };

  const toggleTaskDone = (index) => {
    const updatedTasks = mainTask.map((task, i) =>
      i === index ? { ...task, isDone: !task.isDone } : task
    );
    setMainTask(updatedTasks);
  };

  let renderTask = (
    <h2 className="text-center text-xl text-gray-600">No tasks available</h2>
  );

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <li
        key={i}
        className={`flex justify-between items-start p-4 bg-white shadow rounded mb-3 ${t.isDone ? "bg-green-100" : ""}`} // Apply style when task is done
      >
        <div className="flex flex-col w-4/5">
          <h5 className={`text-xl font-semibold mb-2 ${t.isDone ? "line-through text-gray-400" : ""}`}>{t.title}</h5>
          <h6 className={`text-lg text-gray-600 ${t.isDone ? "line-through text-gray-400" : ""}`}>{t.desc}</h6>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => toggleTaskDone(i)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Task Done
          </button>
          <button
            onClick={() => deleteTask(i)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </li>
    ));
  }

  return (
    <>
      <h1 className="bg-black text-white p-5 text-5xl font-bold text-center">
        My Todo-List
      </h1>

      <form onSubmit={submitHandler} className="flex flex-col items-center">
        {/* Title Input */}
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2 w-1/2"
          placeholder="Enter Title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description Input */}
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2 w-1/2"
          placeholder="Enter Description here"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        {/* Submit Button */}
        <button className="bg-black text-white px-6 py-3 m-5 text-2xl font-bold rounded">
          Add Task
        </button>
      </form>

      <hr className="my-8" />

      <div className="p-8 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default Page;
