import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import "./Detail.css";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const GameDetail = () => {
  const { gameId } = useParams();
  const [gameData, setGameData] = useState(null);
  const db = getFirestore();
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const gameDoc = await getDoc(doc(db, "games", gameId));
        if (gameDoc.exists()) {
          setGameData(gameDoc.data());
        } else {
          console.log("Game not found");
        }
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    fetchGameData();
  }, [gameId]);

  const handleBuyClick = async () => {
    try {
      await addDoc(collection(db, "purchasedGames"), gameData);
    } catch (error) {
      console.error("Error purchasing game:", error);
    }
  };
  return (
    <div className="container-detail">
      <div className="game-detail-container">
        {gameData ? (
          <div>
            <div className="game-detail-header">
              <img src={gameData.imageUrl} alt={gameData.title} />
              <div className="game-detail-title">
                <h1>{gameData.title}</h1>
                <p>{`Rp ${gameData.price}`}</p>
                <p>{`Game Type: ${gameData.selectedGame}`}</p>
                <button onClick={handleBuyClick}>BUY</button>
              </div>
            </div>
            <div className="game-detail-description">
              <h2>Description</h2>
              <p>{gameData.description}</p>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default GameDetail;
