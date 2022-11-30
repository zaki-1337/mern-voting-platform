import side from "./Images/side-photo.jpg";
import screen from "./Images/Screen1.jpg";
import styles from "./Styles/adminlogin.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitValue = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "")
      return alert("Please enter the credentials.");

    const signinDetails = {
      Email: email,
      Password: password,
    };

    setEmail("");
    setPassword("");

    axios
      .post("http://localhost:3001/app/adminlogin", signinDetails)
      .then((response) => {
        if (response.status === 200) navigate("/insertfiles");
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          if (error.response.status === 666)
            return alert("Incorrect credentials. Try again.");
        }
      });
  };

  const myStyle = {
    backgroundImage: `url(${screen})`,
    height: "100vh",
    width: "100vw",
    paddingTop: "8%",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div style={myStyle}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
  body { height: 100%;
    overflow-y: hidden;
    margin-top:-6px;
    margin-left: 0px; }
`,
        }}
      />
      <div className={styles.divmainstyle}>
        <div className={styles.indev1}>
          <div className={styles.h1}>
            <br />
            <br />
            <span
              style={{
                fontFamily: "Epilogue",
                fontSize: "32px",
                color: "#171A1FFF",
                lineHeight: "48px",
              }}
            >
              Administrator Sign-In
            </span>
          </div>
          <form>
            <div className={styles.pl}>
              <br />
              <div
                style={{
                  height: "60px",
                  width: "300px",
                  borderRadius: "7px",
                  borderWidth: "0px",
                  backgroundColor: "#EEEEEE",
                }}
              >
                <label className={styles.firstheading}>
                  <pre>
                    <h3> Email</h3>
                  </pre>
                </label>
                <input
                  type="textarea"
                  id="Email"
                  className={styles.emailentry}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  name="Email"
                  placeholder="  example:email@gmail.com"
                  required
                  style={{
                    borderWidth: "0px",
                    width: "290px",
                    backgroundColor: "#EEEEEE",
                  }}
                />
                <br />
                <br />
              </div>
              <br />
              <div
                style={{
                  height: "60px",
                  width: "300px",
                  borderRadius: "7px",
                  borderWidth: "0px",
                  backgroundColor: "#EEEEEE",
                }}
              >
                <label className={styles.firstheading}>
                  <pre>
                    <h3> Password</h3>
                  </pre>
                </label>
                <input
                  type="password"
                  id="Password"
                  className={styles.emailentry}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="Password"
                  placeholder=" Enter at least 8+ characters"
                  required
                  style={{
                    borderWidth: "0px",
                    width: "290px",
                    backgroundColor: "#EEEEEE",
                  }}
                />
              </div>
            </div>
            <div className={styles.t}>
              <pre>
                <input
                  type="checkbox"
                  style={{
                    verticalAlign: "middle",
                    position: "relative",
                    bottom: "1px",
                    accentColor: "red",
                  }}
                  name="terms"
                  required
                />
                Agree to the terms and conditions{" "}
                <a
                  onClick={() => alert("Contact the administrator.")}
                  href=""
                  style={{ color: "#EF5350", textDecoration: "none" }}
                >
                  Forgot password?
                </a>
              </pre>
              <br />
            </div>
            <div className={styles.pl}>
              <button
                type="submit"
                style={{
                  width: "310px",
                  height: "50px",
                  borderRadius: "7px",
                  background: "#eb6769ff",
                  opacity: "0.9",
                  color: "white",
                  borderWidth: "0px",
                  "&:hover": { background: "#e7474aff" },
                }}
                onClick={(e) => submitValue(e)}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div className={styles.indev2}>
          <img
            src={side}
            style={{ width: "400px", height: "550px", borderRadius: "10px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
