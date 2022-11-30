import { useState } from "react";
import signup from "./Images/Container 4465.jpg";
import styles from "./Styles/adminsignup.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminSignUpper() {
  const [compName, setcompName] = useState("");
  const [repName, setrepName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const navigate = useNavigate();

  const submitValue = (e) => {
    e.preventDefault();

    if (password !== passwordConf)
      return alert("Passwords do not match. Please try again.");

    const signupDetails = {
      "Company Name": compName,
      "Representative Name": repName,
      Email: email,
      Password: password,
    };

    setcompName("");
    setrepName("");
    setEmail("");
    setPassword("");
    setPasswordConf("");

    axios
      .post("http://localhost:3001/app/signup", signupDetails)
      .then((response) => {
        if (response.status === 200) navigate("/adminlogin");
      });
  };

  return (
    <div className={styles.main}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
  body { height: 100%;
    overflow-y: hidden; }
`,
        }}
      />
      <div>
        <div className={styles.indev1}>
          <div className={styles.h1}>
            <br />
            <br />
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
              <b>Create an account</b>
            </span>
          </div>
          <form>
            <div className={styles.pl}>
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
                    <h3> Company Name</h3>
                  </pre>
                </label>
                <input
                  type="textarea"
                  id="Companyname"
                  className={styles.emailentry}
                  onChange={(e) => setcompName(e.target.value)}
                  value={compName}
                  name="Companyname"
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
                    <h3> Representative Name</h3>
                  </pre>
                </label>
                <input
                  type="textarea"
                  id="Representative Name"
                  className={styles.emailentry}
                  onChange={(e) => setrepName(e.target.value)}
                  value={repName}
                  name="Representative Name"
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
                    <h3> Confirm Password</h3>
                  </pre>
                </label>
                <input
                  type="password"
                  id="Confirm-Password"
                  className={styles.emailentry}
                  onChange={(e) => setPasswordConf(e.target.value)}
                  value={passwordConf}
                  name="Confirm-Password"
                  placeholder=" Enter at least 8+ characters"
                  required
                  style={{
                    borderWidth: "0px",
                    width: "290px",
                    backgroundColor: "#EEEEEE",
                  }}
                />
              </div>
              <br />
            </div>
            <div className={styles.plbutton}>
              <button
                style={{
                  width: "310px",
                  height: "50px",
                  borderRadius: "7px",
                  backgroundColor: "#EF5350",
                  opacity: "0.9",
                  color: "white",
                  borderWidth: "0px",
                }}
                onClick={(e) => submitValue(e)}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.img1}>
        <img
          src={signup}
          style={{ width: "700px", height: "100vh", borderRadius: "10px" }}
        />
      </div>
    </div>
  );
}

export default AdminSignUpper;
