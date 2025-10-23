import { useState } from "react";
import { db } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";
import { Button } from "../components/ui/button";

const AddCertificate = () => {
  const [imgLink, setImgLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await addDoc(collection(db, "Certificates"), {
        Img: imgLink,
        createdAt: new Date(),
      });

      setMessage("✅ Certificate uploaded successfully!");
      setImgLink("");
    } catch (error) {
      console.error("Error uploading certificate:", error);
      setMessage("❌ Failed to upload certificate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#111] via-[#141414] to-[#191919] text-white p-6 rounded-2xl shadow-lg max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        Add Certificate
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-semibold">Image Link</label>
          <input
            type="text"
            placeholder="Paste certificate image URL..."
            value={imgLink}
            onChange={(e) => setImgLink(e.target.value)}
            className="w-full p-2 rounded-md bg-[#222] border border-[#333] text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-md font-semibold transition bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
        >
          {loading ? "Uploading..." : "Upload Certificate"}
        </Button>

        {message && (
          <p className="text-center mt-3 text-sm text-gray-300">{message}</p>
        )}
      </form>
    </div>
  );
};

export default AddCertificate;
