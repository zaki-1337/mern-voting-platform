import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Chart from "./piechartL";
import * as htmlToImage from "html-to-image";

import styles from "./Styles/piechart.module.css";

const Pichart = (props) => {
  // const handleDownload = () => console.log("download");

  const handleDownload = () => {
    var data = document.getElementsByClassName("resultChart");

    const saveAs = (blob, fileName) => {
      var elem = window.document.createElement("a");
      elem.href = blob;
      elem.download = fileName;
      elem.style = "display:none;";
      (document.body || document.documentElement).appendChild(elem);
      if (typeof elem.click === "function") {
        elem.click();
      } else {
        elem.target = "_blank";
        elem.dispatchEvent(
          new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
          })
        );
      }
      URL.revokeObjectURL(elem.href);
      elem.remove();
    };

    for (var i = 0; i < data.length; ++i) {
      htmlToImage.toPng(data[i]).then((dataUrl) => {
        saveAs(dataUrl, "my-node.png");
      });
    }
  };

  const navigate = useNavigate();

  axios.post("http://localhost:3001/app/piechart").then((response) => {
    document.querySelector(".winText").textContent =
      response.data + " is the winner!";
  });

  const handleExit = () => {
    navigate("/");
  };

  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
  body {  height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
    width: 100%;
    box-sizing: inherit; }
`,
        }}
      />
      <div class="header">
        <div
          style={{ display: "flex", justifyContent: "left", marginLeft: "10%" }}
        >
          <div className={styles.headerMenu}>Results</div>
        </div>
      </div>
      <div className={`${styles.pichartContainer} + resultChart`}>
        <h1 className={styles.pichartText}>
          <span className={styles.text}>Result</span>
          <br></br>
        </h1>
        <button
          onClick={handleExit}
          className={`${styles.pichartButton} ${styles.buttonExit}`}
        >
          <span>
            <span>Exit</span>
            <br></br>
          </span>
        </button>
        <button
          onClick={handleDownload}
          className={`${styles.pichartButton1} ${styles.buttonDownload}`}
        >
          Download
        </button>
        <div className={styles.pichartContainer1}>
          <span className={`${styles.pichartText6} winText`}>
            candidate 3 won the election
          </span>
          <img
            alt=""
            src="https://play.teleporthq.io/static/svg/default-img.svg"
            className={styles.pichartImage1}
          />
          <div
            style={{
              marginTop: "230px",
              marginLeft: "00px",
              position: "absolute",
            }}
          >
            <Chart></Chart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pichart;
