import React from "react";
import styles from "./Styles/voting-controls-style.module.css";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  padding: 5px 14px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; /* Body */
  font-size: 16px;
  line-height: 26px;
  color: #ffffffff; /* white */
  background: #eb6769ff; /* primary-500 */
  opacity: 1;
  border: none;
  border-radius: 6px; /* border-m */
  /* Hover */
  &:hover {
    &:enabled {
      color: #ffffffff; /* white */
      background: #e7474aff; /* primary-550 */
    }
  }

  /* Pressed */
  &:hover {
    &:active,
    &:enabled {
      color: #ffffffff; /* white */
      background: #cf1b1eff; /* primary-650 */
    }
  }
  /* Disabled */
  &:disabled {
    opacity: 0.4;
  }
`;

function MainControlHome() {
  const navigate = useNavigate();

  axios.post("http://localhost:3001/app/votingcontrols").then((response) => {
    document.querySelector(
      ".startText"
    ).value = `Candidates: ${response.data["Candidate Count"]}\nVoters: ${response.data["Voter Count"]}\nStatus: Ready`;
    if (response.data["Election Status"] === "Not Started") {
      //already handled
    } else if (response.data["Election Status"] === "Started") {
      document.querySelector(".startButton").setAttribute("disabled", "");
      document.querySelector(".stopText").value = "Election in progress.";
      document.querySelector(".stopButton").removeAttribute("disabled");
      document
        .querySelector(".stopButton")
        .addEventListener("click", stopElection);
    } else if (response.data["Election Status"] === "Finished") {
      document.querySelector(".startButton").setAttribute("disabled", "");
      document.querySelector(".stopText").value = "Election done.";
      document.querySelector(
        ".postText"
      ).value = `Number of Votes Casted: ${response.data["Number Voted"]}\nTotal Number of Voters: ${response.data["Voter Count"]}`;
      document.querySelector(".postButton").removeAttribute("disabled");
      document
        .querySelector(".postButton")
        .addEventListener("click", postResults);
    }
  });

  const startElection = () => {
    axios
      .post("http://localhost:3001/app/votingcontrols/startelection")
      .then((response) => {
        if (response.status === 200) {
          navigate("/votingcontrols");
        }
      });
  };

  const stopElection = () => {
    axios
      .post("http://localhost:3001/app/votingcontrols/stopelection")
      .then((response) => {
        if (response.status === 200) {
          navigate("/votingcontrols");
        }
      });
    document.querySelector(".stopButton").setAttribute("disabled", "");
  };

  const postResults = () => {
    axios
      .post("http://localhost:3001/app/votingcontrols/postresults")
      .then((response) => {
        if (response.status === 200) {
          navigate("/piechart");
        }
      });
  };

  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
  body { background: #F9F9FAFF }
`,
        }}
      />
      <div class="header">
        <div
          style={{ display: "flex", justifyContent: "left", marginLeft: "10%" }}
        >
          <div className={styles.headerMenu}>Admin Dashboard</div>
        </div>
      </div>

      <div
        class="header"
        style={{ display: "flex", flexDirection: "row", marginLeft: "8%" }}
      >
        <div className={styles.text}>Controls</div>
      </div>

      <div className={styles.controls}>
        <div className={`${styles.container}  ${styles.textarea} start`}>
          <Button onClick={startElection} className="startButton">
            Start Election
          </Button>
          <textarea
            className="startText"
            disabled
            value="Candidates: 4&#13;&#10;Voters: 20&#13;&#10;Status: Ready"
          ></textarea>
        </div>

        <div className={`${styles.container}  ${styles.textarea} stop`}>
          <Button className="stopButton" disabled>
            Stop Election
          </Button>
          <textarea
            className="stopText"
            disabled
            value="Start Election First"
          ></textarea>
        </div>

        <div className={`${styles.container}  ${styles.textarea} post`}>
          <Button className="postButton" disabled>
            Post Results
          </Button>
          <textarea
            className="postText"
            disabled
            value="Start/Stop Election First"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default MainControlHome;
