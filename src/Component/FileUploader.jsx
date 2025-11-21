import React, { useState } from "react";
import axios from "axios";
import './Fileupload.css';
import { IoShareSocial } from "react-icons/io5";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected && selected.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview("");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(
        "https://nonascetical-subdermic-edris.ngrok-free.dev/api/files/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setQrCode(res.data.qrCode);
      setShowModal(true);
    } catch (err) {
      console.log("Upload error:", err);
      alert("Upload failed");
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setQrCode("");
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "QR Code",
        text: "Scan this QR to view the uploaded image",
        url: qrCode,
      }).catch(console.log);
    } else {
      alert("Sharing not supported on this browser!");
    }
  };
  return (
    <div className="file-uploader-container">
      <h2>Image Upload & QR Code Generator</h2>

      <input type="file" onChange={handleChange} />
      {preview && <img className="preview-image" src={preview} alt="preview" />}
      <button onClick={handleUpload}>Upload & Generate QR</button>
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Scan this QR code to view image:</h3>

            <img src={qrCode} alt="QR Code" />

            <IoShareSocial
              size={30}
              style={{ color: "#007bff", cursor: "pointer", marginBottom: "-20%" }}
              onClick={handleShare}
            />
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default FileUploader;
