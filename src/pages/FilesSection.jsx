import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function FilesSection() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 1. Fetch all files from backend
  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${API_URL}/files`);
      setFiles(res.data);
    } catch (err) {
      console.error("Failed to fetch files:", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // 🔹 2. Handle file upload (Cloudinary + backend save)
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a .zip or .rar file");

    // Validate manually (extra check)
    // const validTypes = ["application/zip", "application/x-rar-compressed"];
    // if (!validTypes.includes(file.type)) {
    //   return alert("❌ Only .zip or .rar files allowed!");
    // }
// ✅ More flexible MIME type & extension check
const allowedExtensions = [".zip", ".rar"];
const fileName = file.name.toLowerCase();
const isValidExt = allowedExtensions.some(ext => fileName.endsWith(ext));

if (!isValidExt) {
  return alert("❌ Only .zip or .rar files allowed!");
}

    setLoading(true);
    setMessage("");

    try {
      // 🔸 Step 1: Upload to Cloudinary (RAW upload)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "customer_profile"); // 👈 your Cloudinary preset
      formData.append("resource_type", "raw");
      formData.append("folder", "compressed_files");

      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dzo8iyl74/auto/upload",
        formData
      );

      const fileUrl = cloudinaryRes.data.secure_url;
      const fileName = file.name;

      // 🔸 Step 2: Save file info (name + URL) in MongoDB via backend
      await axios.post(`${API_URL}/files/save`, {
        name: fileName,
        url: fileUrl,
      });

      setMessage("✅ File uploaded and saved successfully!");
      setFile(null);
      fetchFiles();
    } catch (err) {
      console.error("Upload failed:", err);
      setMessage("❌ Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 p-4 border-t border-gray-300">
      <h2 className="text-lg font-semibold mb-3">Upload Compressed Files</h2>

      <form onSubmit={handleUpload} className="flex gap-3">
        <input
          type="file"
          accept=".zip,.rar"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}

      <ul className="mt-5 space-y-2">
        {files.map((f) => (
          <li
            key={f._id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{f.name}</span>
            <a
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}




// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function FilesSection() {
//   const [file, setFile] = useState(null);
//   const [files, setFiles] = useState([]);

//   const fetchFiles = async () => {
//     const res = await axios.get("http://localhost:5000/api/files");
//     setFiles(res.data);
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const handleUpload = async (e) => {
//     // alert("handle submit called")
//     e.preventDefault();
//     if (!file) return alert("Please select a .zip or .rar file");

//     const formData = new FormData();
//     formData.append("file", file);

//     await axios.post("http://localhost:5000/api/files/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     setFile(null);
//     fetchFiles();
//   };

//   return (
//     <div className="mt-10 p-4 border-t border-gray-300">
//       <h2 className="text-lg font-semibold mb-3">Upload Compressed Files</h2>
//       <form onSubmit={handleUpload} className="flex gap-3">
//         <input
//           type="file"
//           accept=".zip,.rar"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="border p-2 rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Upload
//         </button>
//       </form>

//       <ul className="mt-5 space-y-2">
//         {files.map((f) => (
//           <li
//             key={f._id}
//             className="flex justify-between items-center border p-2 rounded"
//           >
//             <span>{f.name}</span>
//             <a
//               href={f.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 underline"
//             >
//               Download
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
