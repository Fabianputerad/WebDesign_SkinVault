import "./UploadItems.css";
import React, { useState, useEffect, useRef } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function UploadItems() {
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedGame, setSelectedGame] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      setImageSrc(e.target.result);
      setUploadedImage(file);
      const base64Image = e.target.result;
      setBase64Image(base64Image);
    };

    reader.readAsDataURL(file);
  };

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleImageClick = () => {
    document.getElementById("uploadImage").click();
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const imageRef = "images/" + uploadedImage.name;
      const storageRef = ref(getStorage(), imageRef);
      await uploadBytes(storageRef, uploadedImage);
      const imageUrl = await getDownloadURL(storageRef);
      await addDoc(collection(db, "games"), {
        title: title,
        price: price,
        description: description,
        selectedGame: selectedGame,
        // base64Image: base64Image,
        imageUrl: imageUrl,
      });

      setTitle("");
      setPrice("");
      setDescription("");
      setSelectedGame("");
      setUploadedImage(null);
      // setBase64Image('');
      // setImageSrc(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container-upload">
      <form id="gameForm" onSubmit={handleAdd}>
        <div className="left-container">
          <input
            type="file"
            id="uploadImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <label
            htmlFor="uploadImage"
            className="image-container"
            onClick={handleImageClick}
          >
            {uploadedImage ? (
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="Uploaded"
                className="image-preview"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            ) : (
              <div className="upload-text">Click here to Upload</div>
            )}
          </label>
        </div>
        <div className="right-container">
          <h2>Game Information</h2>

          <div className="form-group">
            <label for="gameTitle">Title:</label>
            <input
              type="text"
              id="gameTitle"
              name="gameTitle"
              onChange={handleTitleChange}
              value={title}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label for="gamePrice">Price:</label>
            <input
              type="number"
              id="gamePrice"
              name="gamePrice"
              onChange={handlePriceChange}
              value={price}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gameSelect">Select Game:</label>
            <select
              id="gameSelect"
              onChange={handleGameChange}
              value={selectedGame}
              className="input-field"
            >
              <option value="">Choose a Game</option>
              <option value="Valorant">Valorant</option>
              <option value="CSGO">CSGO</option>
              <option value="Dota">Dota</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="gameDescription">Description:</label>
            <textarea
              id="gameDescription"
              name="gameDescription"
              onChange={handleDescriptionChange}
              className="input-field"
            />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
