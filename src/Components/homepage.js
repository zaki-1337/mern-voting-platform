import React, { useState } from "react";
import styles from "./Styles/home-page-style.module.css";
import img from "./Images/voting.jpeg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  border: none;
  background-color: inherit;
  padding: 14px 28px;
  cursor: pointer;
  font-size: 16px;
  display: inline-block;
  &:hover {
    background-color: #eee;
  }
`;

function ModalWindowOne({ closeModal }) {
  return (
    <div>
      <div className={styles.modal}>
        <Button
          onClick={() => {
            closeModal(false);
          }}
          className={styles.closemodal}
        >
          &times;
        </Button>
        <h1>I'm a modal window One</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
}
function ModalWindowTwo({ closeModal }) {
  return (
    <div>
      <div className={styles.modal}>
        <Button
          onClick={() => {
            closeModal(false);
          }}
          className={styles.closemodal}
        >
          &times;
        </Button>
        <h1>I'm a modal window Two</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
}
function ModalWindowThree({ closeModal }) {
  return (
    <div>
      <div className={styles.modal}>
        <Button
          onClick={() => {
            closeModal(false);
          }}
          className={styles.closemodal}
        >
          &times;
        </Button>
        <h1>I'm a modal window Three</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
}
function ModalWindowFour({ closeModal }) {
  return (
    <div>
      <div className={styles.modal}>
        <Button
          onClick={() => {
            closeModal(false);
          }}
          className={styles.closemodal}
        >
          &times;
        </Button>
        <h1>I'm a modal window Four</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
}

function ChooseLogin({ closeModal }) {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.modalLogin}>
        <Button
          onClick={() => {
            closeModal(false);
          }}
          className={styles.closemodal}
        >
          &times;
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button
            className={styles.signupButton}
            onClick={() => navigate("/adminlogin")}
          >
            Admin Login
          </button>
          <button
            className={styles.signupButton}
            onClick={() => navigate("/userlogin")}
          >
            User Login
          </button>
        </div>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
}

function MainHome() {
  const navigate = useNavigate();

  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);

  const [chooseLogin, setChooseLogin] = useState(false);

  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
  body { padding: 5px;
    height: 100%;
    overflow-y: hidden; }
`,
        }}
      />
      <div class="MainButtons" style={{ display: "flex" }}>
        <div className={styles.NavbarButtons}>
          <Button
            onClick={() => {
              setOpenModal1(true);
            }}
          >
            Features
          </Button>
          <Button
            onClick={() => {
              setOpenModal2(true);
            }}
          >
            Pricing
          </Button>
          <Button
            onClick={() => {
              setOpenModal3(true);
            }}
          >
            About Us
          </Button>
          <Button
            onClick={() => {
              setOpenModal4(true);
            }}
          >
            Contact
          </Button>
        </div>
        <div className={styles.SigninButtons}>
          <button
            className={styles.signinButton}
            onClick={() => {
              setChooseLogin(true);
            }}
          >
            Sign In
          </button>
          <button
            className={styles.signupButton}
            onClick={() => navigate("/adminsignup")}
          >
            Sign Up
          </button>
        </div>
      </div>
      <div
        class="Text"
        style={{ display: "flex", justifyContent: "center", fontSize: "40px" }}
      >
        <h1>Voting Done Easy</h1>
      </div>
      <div
        class="ImageBig"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img style={{ width: "80%" }} src={img} />
      </div>
      {openModal1 && <ModalWindowOne closeModal={setOpenModal1} />}
      {openModal2 && <ModalWindowTwo closeModal={setOpenModal2} />}
      {openModal3 && <ModalWindowThree closeModal={setOpenModal3} />}
      {openModal4 && <ModalWindowFour closeModal={setOpenModal4} />}
      {chooseLogin && <ChooseLogin closeModal={setChooseLogin} />}
    </div>
  );
}

export default MainHome;
