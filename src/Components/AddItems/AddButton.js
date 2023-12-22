import React from "react";
import "./AddButton.css";

const AddButton = ({ handleClick }) => {
  return (
    <a href="/UploadItems">
      <button className="add-button" id="add-button">
        Add
      </button>
    </a>
  );
};

export default AddButton;
