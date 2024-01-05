import "./NavBar.css";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import { auth } from "../../FirebaseConfig";
import  logo from "../../assets/Logo_WD.png"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const NavBar = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegis, setIsRegis] = useState(false);

  const handleShowSignInModal = () => setShowSignInModal(true);
  const handleCloseSignInModal = () => setShowSignInModal(false);
  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  const handleSignUp = () => {
    setIsRegis(true);
    handleCloseRegisterModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("myForm");

    const formData = new FormData(form);
    const email = formData.get("email");
    const pass = formData.get("pass");
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        console.log(userCredential.user, "authData");
        setIsLoggedIn(true);
        handleCloseRegisterModal();
        setShowSignInModal(true);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to create account. Please try again.");
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = document.getElementById("signInForm");
    const formData = new FormData(form);
    const email = formData.get("email");
    const pass = formData.get("pass");

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        console.log(userCredential.user, "authData");
        setIsLoggedIn(true);
        handleCloseSignInModal();
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to sign in. Please try again.");
      });
  };
  return (
    <nav className="p-3 mb-2 text-white navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">
        <img src={logo} style={{ width: '300px', height: 'auto' }} alt="Logo" />
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ">
            <li className="nav-item ml-5">
              <a
                className="nav-link active text-white"
                aria-current="page"
                href="/"
              >
                Home
              </a>
            </li>
            <li className="nav-item ml-3">
              <a className="nav-link text-white" href="/Library">
                Library
              </a>
            </li>
            <li className="nav-item ml-3">
              <a className="nav-link text-white" href="/MyShop">
                My Shop
              </a>
            </li>
          </ul>
        </div>
        {isLoggedIn ? (
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button variant="outline-light" onClick={handleShowSignInModal}>
            Sign In
          </Button>
        )}
        <Modal
          show={showSignInModal}
          onHide={handleCloseSignInModal}
          className="custom-modal"
        >
          <div className="custom-modal-content">
            <Modal.Header closeButton>
              <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSignIn} id="signInForm">
                <h6>Email</h6>
                <input type="email" placeholder="Email" name="email" />

                <h6>Password</h6>
                <input type="password" placeholder="Password" name="pass" />

                <div className="btnModal">
                  <button type="submit" className="signin-btn">
                    Sign In
                  </button>
                </div>
                <div className="toRegis">
                  <p className="text">
                    Create an{" "}
                    <span
                      onClick={() => {
                        handleCloseSignInModal();
                        handleShowRegisterModal();
                      }}
                    >
                      Account?
                    </span>
                  </p>
                </div>
              </form>
            </Modal.Body>
          </div>
        </Modal>

        <Modal
          show={showRegisterModal}
          onHide={handleCloseRegisterModal}
          className="custom-modal"
        >
          <div className="custom-modal-content">
            <Modal.Header closeButton>
              <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form id="myForm" onSubmit={handleSignUp}>
                <h6>Username</h6>
                <input type="name" placeholder="Username" name="name" />
                <h6>Email</h6>
                <input type="email" placeholder="Email" name="email" />
                <h6>Password</h6>
                <input type="password" placeholder="Password" name="pass" />
                <h6>Confirm Password</h6>
                <input type="password" placeholder="Password" />

                <div className="btnModal">
                  <button type="submit" className="signin-btn" onClick={submit}>
                    Register
                  </button>
                </div>
                <div className="toRegis">
                  <p className="text">
                    Already have an{" "}
                    <span
                      onClick={() => {
                        handleCloseRegisterModal();
                        handleShowSignInModal();
                      }}
                    >
                      Account?
                    </span>
                  </p>
                </div>
              </form>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </nav>
  );
}
export default NavBar;
