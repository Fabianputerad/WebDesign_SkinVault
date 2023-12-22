import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

export default function Card({ game }) {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesCollection = collection(db, "games");
        const snapshot = await getDocs(gamesCollection);
        const gamesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/detail/${id}`, {
      state: {
        item: game,
      },
    });
  };

  return (
    <div className="container">
      <div className="row g-2">
        {games.map((game) => (
          <div key={game.id} className="col-3">
            <div className="card mb-5" style={{ width: "265px" }}>
              <img
                src={game.imageUrl}
                style={{ height: "180px" }}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{game.title}</h5>
                <p className="card-text">{`Rp ${game.price}`}</p>
                <Button
                  variant="primary"
                  onClick={() => handleCardClick(game.id)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
