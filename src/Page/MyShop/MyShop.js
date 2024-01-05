import React, { useState, useEffect } from "react";
import AddButton from "../../Components/AddItems/AddButton"; 
import SearchBar from "../../Components/SearchBar/SearchBar";
import CardUpload from "../../Components/CardUpdate/CardUpdate";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

const MySHop = () => {

  return (
    <div>
      <SearchBar />

      <AddButton />
      <CardUpload />
    </div>
  );
};

export default MySHop;
