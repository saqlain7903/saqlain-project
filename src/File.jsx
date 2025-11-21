import React, { useState } from "react";
import axios from "axios";
import './File.css'
const File = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [images, setImages] = useState("")
  const [qr, setQr] = useState([])
  const ngrok = "https://nonascetical-subdermic-edris.ngrok-free.dev";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setEeviewUrl("");
      }
    }
  };
  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file");

    const formData = new FormData();
    formData.append("images", selectedFile);
    setQr.name("https://nonascetical-subdermic-edris.ngrok-free.dev/api/files/uploads")



    try {
      const res = await axios.post(
        "http://localhost:5000/api/files/upload/images",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data && res.data.originalname) {
        alert(`File uploaded: ${res.data.originalname}`);
      } else {
        console.log("Upload response:", res.data);
        alert("File uploaded, but could not get file name from server")

      }
    } catch (err) {

      console.log("Upload error:", err);
      if (err.response && err.response.data) {
        alert("Upload failed: " + JSON.stringify(err.response.data));
      } else {
        alert("Upload failed: Network or server error");
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const image = setImages
    try {
      const img = "http://localhost:5000"
    }
    catch (err) {
      console.log("Error handling", err);

    }
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Frontend File & Image Uploader</h2>
        <input type="file" onChange={handleFileChange} />
        <div className="preview">
          {previewUrl && <img src={previewUrl} value="previewUrl"/>}
          {selectedFile && !previewUrl && (
            <p className="file-name">Selected File: {selectedFile.name}</p>
          )}
        </div>
        <button onClick={handleUpload} style={{ marginTop: "20px" }}>
          Upload
        </button>
      </form>
    </div>
  );
};
export default File;
