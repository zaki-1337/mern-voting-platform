import React from "react";
import styles from "./Styles/votingpage.module.css";
import "./Styles/votingpage.css";
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
  &:hover:enabled {
    color: #ffffffff; /* white */
    background: #e7474aff; /* primary-550 */
  }
  /* Pressed */
  &:hover:active:enabled {
    color: #ffffffff; /* white */
    background: #cf1b1eff; /* primary-650 */
  }
  /* Disabled */
  &:disabled {
    opacity: 0.4;
  }
`;

let candidateData = [];
let candidateC = "";

function VotingControls() {
  const navigate = useNavigate();

  axios
    .post(
      "http://localhost:3001/app/authuser",
      window.location.pathname.split("/")[2]
    )
    .then((response) => {
      console.log("hello");
    });

  const handleSubmit = () => {
    if (candidateC === "") return alert("Please select a candidate.");
    const voteDetails = {
      voter: window.location.pathname.split("/")[2],
      candidate: candidateC,
    };

    axios
      .post("http://localhost:3001/app/votingpage/vote", voteDetails)
      .then((response) => {
        if (response.status === 200) navigate(`/thankyou/${voteDetails.voter}`);
      });
  };

  axios.post("http://localhost:3001/app/votingpage").then((response) => {
    response.data.forEach(function (mov) {
      if (candidateData.indexOf(mov["Candidate Name"]) === -1) {
        const html = `<div class="candidate">
   <div class="radioButton">
     <input type="radio" id=${mov["Candidate Name"].replace(" ", "_")} value=${
          mov["Candidate Name"]
        } name="one"/>
     ${mov["Candidate Name"]}
   </div>
   <div class="candidateAbout">${mov["Candidate Info"]}</div>
 </div>`;

        document.querySelector(".grey").insertAdjacentHTML("afterbegin", html);
        document
          .getElementById(mov["Candidate Name"].replace(" ", "_"))
          .addEventListener("click", (e) => {
            candidateC = e.target.id.replace("_", " ");
          });
        candidateData.push(mov["Candidate Name"]);
      }
    });
  });

  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
  body { background: #F9F9FAFF }
`,
        }}
      />
      <div>
        <div
          style={{ display: "flex", justifyContent: "left", marginLeft: "10%" }}
        >
          <div className={styles.headerMenu}>Vote</div>
        </div>
      </div>

      <div
        class="header"
        style={{ display: "flex", flexDirection: "column", marginLeft: "8%" }}
      >
        <div className={styles.text}>Controls</div>
        {/* <div className={styles.post}>Post: Administrator</div> */}
      </div>

      <div
        class="grey"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#DEE1E6FF",
          height: "50vh",
          width: "80vw",
          marginLeft: "auto",
          marginRight: "auto",
          overflow: "auto",
          padding: "50px",
        }}
      ></div>
      <div
        class="nextButton"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
          padding: "5px",
          marginRight: "6vw",
        }}
      >
        <Button onClick={handleSubmit}>Next</Button>
      </div>
    </div>
  );
}

export default VotingControls;
