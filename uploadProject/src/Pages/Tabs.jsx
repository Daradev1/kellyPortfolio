import { useState } from "react";
import AddProject from "./AddProject";
import AddCertificate from "./AddCertificate";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("project");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0d0d] via-[#111] to-[#151515] p-6 text-white">
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("project")}
          className={`px-6 py-2 rounded-xl font-semibold transition ${
            activeTab === "project"
              ? "bg-gradient-to-r from-purple-500 to-pink-500"
              : "bg-[#222] hover:bg-[#2b2b2b]"
          }`}
        >
          Upload Project
        </button>
        <button
          onClick={() => setActiveTab("certificate")}
          className={`px-6 py-2 rounded-xl font-semibold transition ${
            activeTab === "certificate"
              ? "bg-gradient-to-r from-purple-500 to-pink-500"
              : "bg-[#222] hover:bg-[#2b2b2b]"
          }`}
        >
          Upload Certificate
        </button>
      </div>

      {activeTab === "project" ? <AddProject /> : <AddCertificate />}
    </div>
  );
};

export default Tabs;
