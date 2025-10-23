import { useState } from "react";
import { db } from "../Firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Textarea } from "../components/ui/textarea.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProject() {
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Type: "",
    Img: "",
    Link: "",
    Features: [],
    TechStack: [],
  });

  const [featureInput, setFeatureInput] = useState("");
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle general input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add feature
  const addFeature = () => {
    if (featureInput.trim() === "") return;
    setFormData({
      ...formData,
      Features: [...formData.Features, featureInput.trim()],
    });
    setFeatureInput("");
  };

  // Add tech stack
  const addTech = () => {
    if (techInput.trim() === "") return;
    setFormData({
      ...formData,
      TechStack: [...formData.TechStack, techInput.trim()],
    });
    setTechInput("");
  };

  // Submit project
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const { Title, Description, Type, Img, Link } = formData;
    if (!Title || !Description || !Type || !Img || !Link) {
      toast.error("Please fill all required fields ⚠️");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "Projects"), formData);
      toast.success("✅ Project added successfully!");

      // Reset form
      setFormData({
        Title: "",
        Description: "",
        Type: "",
        Img: "",
        Link: "",
        Features: [],
        TechStack: [],
      });
    } catch (error) {
      console.error("Error adding document:", error);
      toast.error("❌ Failed to upload project. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/10">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Add a <span className="text-indigo-300">New Project</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Project Title"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
              className="bg-white/10 text-white placeholder:text-gray-400 border-none focus:ring-2 focus:ring-indigo-400"
            />
            <Input
              placeholder="Project Type"
              name="Type"
              value={formData.Type}
              onChange={handleChange}
              className="bg-white/10 text-white placeholder:text-gray-400 border-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <Textarea
            placeholder="Project Description"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            className="bg-white/10 text-white placeholder:text-gray-400 border-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Image URL"
              name="Img"
              value={formData.Img}
              onChange={handleChange}
              className="bg-white/10 text-white placeholder:text-gray-400 border-none focus:ring-2 focus:ring-indigo-400"
            />
            <Input
              placeholder="Project Link"
              name="Link"
              value={formData.Link}
              onChange={handleChange}
              className="bg-white/10 text-white placeholder:text-gray-400 border-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Features input */}
          <div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a feature"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                className="bg-white/10 text-white placeholder:text-gray-400 border-none focus:ring-2 focus:ring-indigo-400"
              />
              <Button
                type="button"
                onClick={addFeature}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6"
              >
                Add
              </Button>
            </div>
            <ul className="flex flex-wrap gap-2 mt-3">
              {formData.Features.map((f, i) => (
                <li
                  key={i}
                  className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-xs text-indigo-200"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack input */}
          <div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tech stack"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="bg-white/10 text-white placeholder:text-gray-400 border-none focus:ring-2 focus:ring-indigo-400"
              />
              <Button
                type="button"
                onClick={addTech}
                className="bg-slate-700 hover:bg-slate-800 text-white rounded-xl px-6"
              >
                Add
              </Button>
            </div>
            <ul className="flex flex-wrap gap-2 mt-3">
              {formData.TechStack.map((t, i) => (
                <li
                  key={i}
                  className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-xs text-indigo-200"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-6 font-semibold text-lg bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl transition-all"
          >
            {loading ? "Uploading..." : "Upload Project"}
          </Button>
        </form>
      </div>
    </div>
  );
}
