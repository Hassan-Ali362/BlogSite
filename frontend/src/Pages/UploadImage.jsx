import React, { useState } from "react";
import axios from "axios";

function UploadImage({ setImgUrl }) {
  const [image, setImg] = useState(""); // store file selected by user
  const [preview, setPreview] = useState(""); // Stores a temporary preview URL to show the image before upload.
  const [cloudUrl, setCloudUrl] = useState(""); // Stores the Cloudinary image URL after successful upload.

  const handleChange = (e) => {
    setImg(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0])); // it creates a temporary url to display selected img as preview
  };

  const handleUpload = async () => {
    const formData = new FormData(); // FormData() is used to send files in a format your backend expects (multipart/form-data)
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCloudUrl(response.data.imgUrl); // instead of response.data.url
      setImgUrl(response.data.imgUrl);
      alert("Image uploaded");
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  return (
    <>
      <div className="p-2 w-20  md:w-150 rounded-2xl border border-gray-700 mb-7">
        <div className="flex flex-col items-center justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hover:text-gray-300 bg-blue-900 p-2 rounded-xl text-white w-23.5 mb-3"
          />
          {!cloudUrl && preview && (
            <img src={preview} alt="preview" className="w-90 h-80" />
          )}

          {cloudUrl && (
            <div>
              <p>Uploaded Image:</p>
              <img src={cloudUrl} alt="cloudinary" className="w-95 h-80"/>
            </div>
          )}
          <button
            onClick={handleUpload}
            className="hover:text-gray-300 bg-blue-900 p-3 rounded-xl text-white mt-8"
          >
            Upload The Image
          </button>
        </div>
      </div>
    </>
  );
}

export default UploadImage;
