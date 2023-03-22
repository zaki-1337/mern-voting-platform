import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Styles/insertfiles.module.css";

const Home = (props) => {
  const [candidateDetails, setCandidadteDetails] = useState(null);
  const [voterDetails, setVoterDetails] = useState(null);
  const [done, setDone] = useState(false);

  const navigate = useNavigate();

  const handleNext = () => {
    if (voterDetails !== 1 || candidateDetails !== 1)
      return alert("Upload files first!");
    navigate("/votingcontrols");
  };

  const submitValue = (e) => {
    e.preventDefault();

    if (done) return alert("Files already uploaded.");

    if (voterDetails === null || candidateDetails === null)
      return alert("Upload files first!");

    const voterData = new FormData();
    voterData.append("file", voterDetails);
    axios
      .post("http://localhost:3001/app/insertfiles/voterData", voterData)
      .then((res) => {
        if (res.status === 200) {
          setCandidadteDetails(1);
        }
      });

    const candidateData = new FormData();
    candidateData.append("file", candidateDetails);
    axios
      .post(
        "http://localhost:3001/app/insertfiles/candidateData",
        candidateData
      )
      .then((res) => {
        if (res.status === 200) {
          setVoterDetails(1);
        }
      });

    if (voterDetails && candidateDetails) {
      alert("Files were uploaded successfully!");
      setDone(true);
    } else alert("Upload files first!");
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContainer1}>
        <h1 className={styles.homeText}>
          <span>Data Form</span>
        </h1>
        <span className={styles.homeText3}>
          <br />
          Upload the .xlsx files
        </span>
        <form>
          <input
            type="file"
            id="canditate_details"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            required
            placeholder="placeholder"
            className={styles.homeTextinput}
            onChange={(e) => setCandidadteDetails(e.target.files[0])}
          />
          <label htmlFor="canditate_details" className={styles.homeText4}>
            Candidate Details
          </label>
          <br />
          <input
            type="file"
            id="voter_details"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            required
            placeholder="placeholder"
            className={styles.homeTextinput1}
            onChange={(e) => setVoterDetails(e.target.files[0])}
          />
          <label htmlFor="voter_details" className={styles.homeText5}>
            Voter details
          </label>
          <input
            type="checkbox"
            style={{
              verticalAlign: "middle",
              position: "relative",
              bottom: "1px",
              accentColor: "red",
            }}
            id="confirm_no"
            required
            className={styles.homeCheckbox}
          />
          <label className={styles.homeLabel}>
            <span> Confirm</span>
            <br></br>
          </label>
          <button
            onClick={handleNext}
            className={`${styles.homeButton} ${styles.button}`}
          >
            Next
          </button>
          <button
            onClick={(e) => submitValue(e)}
            className={`${styles.homeButton1} ${styles.button}`}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
