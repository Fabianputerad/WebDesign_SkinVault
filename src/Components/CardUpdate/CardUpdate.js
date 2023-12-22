// import React, { useState, useEffect } from "react";
// import { Modal, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import "./CardUpdate.css";
// import { db } from "../../FirebaseConfig";
// import {
//   collection,
//   getDocs,
//   deleteDoc,
//   updateDoc,
//   doc,
// } from "firebase/firestore";

// export default function CardUpload({ game }) {
//   const [games, setGames] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   // const [selectedGame, setSelectedGame] = useState(null);
//   const [selectedGame, setSelectedGame] = useState({
//     imageUrl: '',
//     title: '',
//     price: '',
//     gameType: '',
//     description: '',
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchGames = async () => {
//       const gamesCollection = collection(db, "games");
//       const snapshot = await getDocs(gamesCollection);
//       const gamesData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setGames(gamesData);
//     };

//     fetchGames();
//   }, []);

//   const handleCardClick = (id) => {
//     navigate(`/detail/${id}`);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteDoc(doc(db, "games", id));
//       setGames(games.filter((game) => game.id !== id));
//     } catch (error) {
//       console.error("Error removing document: ", error);
//     }
//   };

//   const handleUpdate = async (id) => {
//     const selectedGame = games.find((game) => game.id === id);

//   // Check if selectedGame is populated correctly
//   if (selectedGame) {
//     setSelectedGame(selectedGame);
//     setShowModal(true);
//   } else {
//     console.error("Selected game not found or incomplete.");
//     // Handle the case where the selected game is not found or incomplete
//   }
//     // const selectedGame = games.find((game) => game.id === id);
//     // setSelectedGame(selectedGame);
//     // setShowModal(true);
//   };

//   const handleUpdateFirestore = async () => {
//     try {
//       // Check if selectedGame exists and has necessary properties
//       if (
//         selectedGame &&
//         selectedGame.id &&
//         selectedGame.imageUrl &&
//         selectedGame.title &&
//         selectedGame.price &&
//         selectedGame.gameType &&
//         selectedGame.description
//       ) {
//         console.log("Updating game:", selectedGame); // Debugging log
//         const gameRef = doc(db, "games", selectedGame.id);
//         await updateDoc(gameRef, {
//           imageUrl: selectedGame.imageUrl,
//           title: selectedGame.title,
//           price: selectedGame.price,
//           gameType: selectedGame.gameType,
//           description: selectedGame.description,
//         });
//         setShowModal(false);
//       } else {
//         console.error("Selected game is incomplete or undefined.");
//         // Handle the case where selectedGame is incomplete or undefined
//       }
//     } catch (error) {
//       console.error("Error updating document: ", error);
//       // Handle specific error cases if needed
//     }
//     // try {
//     //   const gameRef = doc(db, "games", selectedGame.id);
//     //   await updateDoc(gameRef, {
//     //     imageUrl: selectedGame.imageUrl,
//     //     title: selectedGame.title,
//     //     price: selectedGame.price,
//     //     gameType: selectedGame.gameType,
//     //     description: selectedGame.description,
//     //   });
//     //   setShowModal(false);
//     // } catch (error) {
//     //   console.error("Error updating document: ", error);
//     // }
//   };

//   return (
//     <div className="container">
//       <div className="row g-2">
//         {games.map((game) => (
//           <div key={game.id} className="col-3">
//             <div className="card mb-5" style={{ width: "265px" }}>
//               <img
//                 src={game.imageUrl}
//                 style={{ height: "180px" }}
//                 className="card-img-top"
//                 alt="..."
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{game.title}</h5>
//                 <p className="card-text">{`Rp ${game.price}`}</p>
//                 <Button
//                   variant="primary"
//                   onClick={() => handleCardClick(game.id)}
//                 >
//                   View Details
//                 </Button>
//                 <Button
//                   variant="danger"
//                   onClick={() => handleDelete(game.id)}
//                   className="ms-2"
//                 >
//                   Delete
//                 </Button>
//                 <Button
//                   variant="info"
//                   onClick={() => handleUpdate(game.id)}
//                   className="ms-2"
//                 >
//                   Update
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showModal && (
//         <Modal show={showModal} onHide={() => setShowModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Update Game</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <form onSubmit={handleUpdateFirestore}>
//               <div className="mb-3">
//                 <label htmlFor="imageUrl" className="form-label">
//                   Image URL
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="imageUrl"
//                   value={selectedGame.imageUrl}
//                   onChange={(e) =>
//                     setSelectedGame({
//                       ...selectedGame,
//                       imageUrl: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="title" className="form-label">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="title"
//                   value={selectedGame.title}
//                   onChange={(e) =>
//                     setSelectedGame({ ...selectedGame, title: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="price" className="form-label">
//                   Price
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   id="price"
//                   value={selectedGame.price}
//                   onChange={(e) =>
//                     setSelectedGame({ ...selectedGame, price: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="gameType" className="form-label">
//                   Game Type
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="gameType"
//                   value={selectedGame.gameType}
//                   onChange={(e) =>
//                     setSelectedGame({
//                       ...selectedGame,
//                       gameType: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="description" className="form-label">
//                   Description
//                 </label>
//                 <textarea
//                   className="form-control"
//                   id="description"
//                   value={selectedGame.description}
//                   onChange={(e) =>
//                     setSelectedGame({
//                       ...selectedGame,
//                       description: e.target.value,
//                     })
//                   }
//                 ></textarea>
//               </div>
//             </form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleUpdateFirestore}>
//               Update
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CardUpdate.css";
import { db } from "../../FirebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function CardUpload({ game }) {
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      const gamesCollection = collection(db, "games");
      const snapshot = await getDocs(gamesCollection);
      const gamesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGames(gamesData);
    };

    fetchGames();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "games", id));
      setGames(games.filter((game) => game.id !== id));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const handleUpdate = async (id) => {
    const selectedGame = games.find((game) => game.id === id);
    setSelectedGame(selectedGame);
    setShowModal(true);
  };

  const handleUpdateFirestore = async () => {
    // try {
    //   if (
    //     selectedGame &&
    //     selectedGame.id &&
    //     selectedGame.imageUrl !== undefined &&
    //     selectedGame.title !== undefined &&
    //     selectedGame.price !== undefined &&
    //     selectedGame.gameType !== undefined &&
    //     selectedGame.description !== undefined
    //   ) {
    //     const gameRef = doc(db, 'games', selectedGame.id);
    //     await updateDoc(gameRef, {
    //       imageUrl: selectedGame.imageUrl,
    //       title: selectedGame.title,
    //       price: selectedGame.price,
    //       gameType: selectedGame.gameType,
    //       description: selectedGame.description,
    //     });
    //     setShowModal(false);
    //   } else {
    //     console.error('One or more fields in selected game is undefined.');
    //     // Handle the case where one or more fields are undefined
    //   }
    // } catch (error) {
    //   console.error('Error updating document: ', error);
    // }
    try {
      const gameRef = doc(db, "games", selectedGame.id);
      await updateDoc(gameRef, {
        imageUrl: selectedGame.imageUrl,
        title: selectedGame.title,
        price: selectedGame.price,
        gameType: selectedGame.gameType,
        description: selectedGame.description,
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
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
                <Button
                  variant="danger"
                  onClick={() => handleDelete(game.id)}
                  className="ms-2"
                >
                  Delete
                </Button>
                <Button
                  variant="info"
                  onClick={() => handleUpdate(game.id)}
                  className="ms-2"
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <div className="custom-modal-content">
            <Modal.Header closeButton>
              <Modal.Title>Update Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleUpdateFirestore}>
                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">
                    Image URL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="imageUrl"
                    value={selectedGame.imageUrl}
                    onChange={(e) =>
                      setSelectedGame({
                        ...selectedGame,
                        imageUrl: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={selectedGame.title}
                    onChange={(e) =>
                      setSelectedGame({
                        ...selectedGame,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={selectedGame.price}
                    onChange={(e) =>
                      setSelectedGame({
                        ...selectedGame,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="gameType" className="form-label">
                    Game Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="gameType"
                    value={selectedGame.gameType}
                    onChange={(e) =>
                      setSelectedGame({
                        ...selectedGame,
                        gameType: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={selectedGame.description}
                    onChange={(e) =>
                      setSelectedGame({
                        ...selectedGame,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdateFirestore}>
                Update
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      )}
    </div>
  );
}
