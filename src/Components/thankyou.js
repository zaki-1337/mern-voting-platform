import styles from "./Styles/thankyou.module.css";
import image from "./Images/tq.png";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  border: none;
  background-color: #ff4d4d;
  padding: 14px 18px;
  cursor: pointer;
  font-size: 16px;
  display: inline-block;
  color: white;
  border-radius: 6px;
  &:hover {
    &:enabled {
      color: #ffffffff; /* white */
      background: #e7474aff; /* primary-550 */
    }
  }
`;

const Thankyou = (props) => {
  const navigate = useNavigate();
  const goToResults = () => {
    axios
      .post("http://localhost:3001/app/thankyou/gotoresults")
      .then(function (response) {
        if (response.status === 200) {
          navigate("/piechart");
        }
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          if (error.response.status === 999)
            return alert("The Results have not been posted yet. Please wait.");
        }
      });
  };

  const tempObj = { voter: window.location.pathname.split("/")[2] };
  axios.post("http://localhost:3001/app/thankyou", tempObj).then((response) => {
    console.log(response.data);
    document.querySelector(".answerDate").textContent =
      new Date().toDateString();
    document.querySelector(".answerName").textContent = response.data.nameVoter;
    document.querySelector(".answerVotedFor").textContent =
      response.data.votedFor;
  });

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
  body { overflow-x: hidden; }
`,
        }}
      />
      <div class="img" style={{ marginLeft: "40vw" }}>
        <img src={image} style={{ width: "20vw" }} />
      </div>
      <div
        class="thankYouText"
        style={{ marginLeft: "35vw", width: "40vw", padding: "40px" }}
      >
        <h1>Thank you for your submission!</h1>
        <h3 style={{ marginLeft: "10vw" }}>Every vote counts.</h3>
      </div>
      <div
        class="info"
        style={{
          boxShadow: "10px 5px 3px 1px #d4d4d4",
          justifyContent: "center",
          marginLeft: "35vw",
          display: "flex",
          flexDirection: "column",
          width: "30vw",
          padding: "15px",
        }}
      >
        <div className={styles.row}>
          <div>
            <svg
              class="w-6 h-6"
              fill="[object Object]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={{
                width: "20px",
                height: "20px",
                fill: "#EB6769FF",
                verticalAlign: "middle",
                position: "relative",
                bottom: "1px",
              }}
            >
              <g>
                <path d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zM4 9v10h16V9H4zm2 4h5v4H6v-4z" />
              </g>
            </svg>
            Date:
          </div>
          <div class="answerDate">lol</div>
        </div>
        <br />
        <div className={styles.row}>
          <div>
            <svg
              class="w-6 h-6"
              fill="[object Object]"
              id="Flat"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              style={{
                width: "20px",
                height: "20px",
                fill: "#EB6769FF",
                verticalAlign: "middle",
                position: "relative",
                bottom: "1px",
              }}
            >
              <path d="M231.93652,211.98633a120.48624,120.48624,0,0,0-67.12011-54.14258,72,72,0,1,0-73.63282,0,120.48813,120.48813,0,0,0-67.11865,54.14062,7.99981,7.99981,0,1,0,13.84863,8.0127,104.0375,104.0375,0,0,1,180.17432.00195,7.99981,7.99981,0,1,0,13.84863-8.01269ZM72,96a56,56,0,1,1,56,56A56.06353,56.06353,0,0,1,72,96Z" />
            </svg>
            Name:
          </div>
          <div class="answerName">lol</div>
        </div>
        <br />
        <div className={styles.row}>
          <div>
            <svg
              class="w-6 h-6"
              fill="[object Object]"
              id="Flat"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256.00098 256.00098"
              style={{
                width: "20px",
                height: "20px",
                fill: "#EB6769FF",
                verticalAlign: "middle",
                position: "relative",
                bottom: "1px",
              }}
            >
              <path d="M232.96484,147.02344l-8.96093-13.44531V122.42188l8.95312-13.42969a16.29268,16.29268,0,0,0,2.07813-13.64063,111.35623,111.35623,0,0,0-8.25-19.96093,16.10264,16.10264,0,0,0-11.09375-8.15625L199.832,64.0625l-7.89062-7.89062L188.76953,40.3125a16.087,16.087,0,0,0-8.17187-11.10156,111.876,111.876,0,0,0-19.9375-8.24219,16.1518,16.1518,0,0,0-13.64063,2.07031L133.582,32H122.42578l-13.44531-8.96094a16.07924,16.07924,0,0,0-13.625-2.07031,111.35633,111.35633,0,0,0-19.96094,8.25A16.03535,16.03535,0,0,0,67.23828,40.3125L64.06641,56.17188,56.17578,64.0625l-15.875,3.17188a16.04953,16.04953,0,0,0-11.08594,8.16406,111.902,111.902,0,0,0-8.25,19.94531,16.11138,16.11138,0,0,0,2.07032,13.63281l8.96875,13.44532v11.15625l-8.97657,13.45312a16.11465,16.11465,0,0,0-2.0625,13.625,111.27469,111.27469,0,0,0,8.25,19.92969,16.02367,16.02367,0,0,0,11.09375,8.17969l15.86719,3.17187,7.89063,7.89063,3.17187,15.85156a15.99408,15.99408,0,0,0,8.15625,11.10937,110.83629,110.83629,0,0,0,19.94531,8.23438,15.93362,15.93362,0,0,0,13.64063-2.0625L122.42578,224H133.582l13.4375,8.96094a16.27,16.27,0,0,0,9.01563,2.76562,15.88124,15.88124,0,0,0,4.625-.69531,111.48249,111.48249,0,0,0,19.92968-8.24219,15.97484,15.97484,0,0,0,8.17188-11.09375l3.17187-15.86718,7.89844-7.89063,15.86719-3.17187a16.11139,16.11139,0,0,0,11.09375-8.17188,111.43838,111.43838,0,0,0,8.24219-19.9375A16.28784,16.28784,0,0,0,232.96484,147.02344ZM128.001,176.001a48,48,0,1,1,48-48A48.0005,48.0005,0,0,1,128.001,176.001Z" />
            </svg>
            Voted For:
          </div>
          <div class="answerVotedFor">lol</div>
        </div>
      </div>
      <div
        class="resultSoonText"
        style={{ marginLeft: "35vw", padding: "40px" }}
      >
        <h1>The results will be out shortly.</h1>
      </div>
      <div class="buttons" style={{ marginLeft: "88vw", width: "200px" }}>
        <Button onClick={goToResults}>Go To Results</Button>
      </div>
    </div>
  );
};

export default Thankyou;
