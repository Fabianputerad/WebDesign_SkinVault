import "./SliderCarousel.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderCarousel.css";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";

export default function SliderCarousel() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesCollection = collection(db, "games");
        const snapshot = await getDocs(gamesCollection);
        const gamesData = [];
        snapshot.forEach((doc) => {
          gamesData.push({ id: doc.id, ...doc.data() });
        });
        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games: ", error);
      }
    };

    fetchGames();
  }, []);
  return (
    <Slider {...settings}>
      {games.map((game) => (
        <div key={game.id} className="container-carousel">
          <div className="slider">
            <div className="sliderImg">
              <img src={game.imageUrl} className="Valo" alt={game.title} />
            </div>
            <div className="SliderContent">
              <p className="namaGame">{game.title}</p>
              <div className="imgContent">
                <div className="IsiImg">
                  <div className="container-image-content text-center">
                    <div className="row">
                      <div className="col">
                        <img
                          src={game.imageUrl}
                          className="Isi"
                          alt="Game Image 1"
                        />
                      </div>
                      <div className="col">
                        <img
                          src={game.imageUrl}
                          className="Isi"
                          alt="Game Image 2"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <img
                          src={game.imageUrl}
                          className="Isi"
                          alt="Game Image 3"
                        />
                      </div>
                      <div className="col">
                        <img
                          src={game.imageUrl}
                          className="Isi"
                          alt="Game Image 4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="playNow">Play Now</p>
                <div
                  className="Discount"
                  style={{ backgroundColor: "#8cc414" }}
                >
                  <p>Recommended!</p>
                </div>
                <div className="Harga">
                  <p>Rp 50.000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
