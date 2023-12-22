import "./App.css";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Main from "./Page/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./Page/Detail/GameDetail";
import NavBar from "./Components/NavBar/NavBar";
import MyShop from "./Page/MyShop/MyShop";
import UploadItems from "./Page/UploadItems/UploadItems";
import GameDetail from "./Page/Detail/GameDetail";
import LibraryPage from "./Page/library/LibrarPage";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/MyShop" element={<MyShop />} />
          <Route path="/detail/:gameId" element={<GameDetail />} />
          <Route path="/UploadItems" element={<UploadItems />} />
          <Route path="/Library" element={<LibraryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
