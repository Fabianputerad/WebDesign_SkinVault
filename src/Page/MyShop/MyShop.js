import React, { useState, useEffect } from "react";
import AddButton from "../../Components/AddItems/AddButton"; 
import SearchBar from "../../Components/SearchBar/SearchBar";
import CardUpload from "../../Components/CardUpdate/CardUpdate";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

const MySHop = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [gamesData, setGamesData] = useState([]);

  // useEffect(() => {
  //   const fetchGamesData = async () => {
  //     try {
  //       const gamesCollection = collection(db, "games");
  //       const querySnapshot = await getDocs(gamesCollection);
  //       const games = [];
  //       querySnapshot.forEach((doc) => {
  //         games.push({ id: doc.id, ...doc.data() });
  //       });
  //       setGamesData(games);
  //     } catch (error) {
  //       console.error("Error fetching games data:", error);
  //     }
  //   };

  //   fetchGamesData();
  // }, []);

  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // const filteredGames = gamesData.filter((game) =>
  //   game.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    // <div className="container-MyShop">
    //   <SearchBar handleChange={handleSearchChange} searchTerm={searchTerm} />
    //   <AddButton />
    //   {filteredGames.map((game) => (
    //     <CardUpload key={game.id} title={game.title} />
    //   ))}
    // </div>
    <div>
      <SearchBar />

      <AddButton />
      <CardUpload />
    </div>
  );
};

export default MySHop;
