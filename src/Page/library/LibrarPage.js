import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import "./LibraryPage.css";

const LibraryPage = () => {
  const [purchasedGames, setPurchasedGames] = useState([]);

  useEffect(() => {
    const fetchPurchasedGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "purchasedGames"));
        const games = [];
        querySnapshot.forEach((doc) => {
          games.push(doc.data());
        });
        setPurchasedGames(games);
      } catch (error) {
        console.error("Error fetching purchased games:", error);
      }
    };

    fetchPurchasedGames();
  }, []);

  return (
    <div className="library-container">
      {purchasedGames.map((game, index) => (
        <div key={index} className="library-card">
          <img src={game.imageUrl} alt={game.title} />
          <h3>{game.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default LibraryPage;
