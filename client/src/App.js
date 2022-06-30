// @ts-check
import "./App.css";
import { useImmer } from "use-immer";
import axios from "axios";

export default function App() {
  const [user, setUser] = useImmer({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function setFirstName(e) {
    setUser((user) => {
      user.firstName = e.target.value;
      if (!e.target.value) {
        user.firstName = "";
      }
    });
  }
  function setLastName(e) {
    setUser((user) => {
      user.lastName = e.target.value;
      if (!e.target.value) {
        user.lastName = "";
      }
    });
  }

  function setEmail(e) {
    let val = e.target.value;
    setUser((user) => {
      user.email = val;
      if (!val) {
        user.email = "";
      }
      let emailPattern = /^[a-z 0-9 .]+\@[a-z]+\.[a-z]{3,5}$/;
      if (!val.match(emailPattern) && val) {
        user.email = "";
      }
    });
  }

  function setPassword(e) {
    setUser((user) => {
      user.password = e.target.value;
      if (!e.target.value) {
        user.password = "";
      }
    });
  }

  function onSignUp(e) {
    e.preventDefault();
    let userEnteredData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
    if (user.firstName && user.lastName && user.email && user.password) {
      axios
        .post("http://localhost:3001/signup", userEnteredData)
        .then((res) => {
          console.log(res.data);
          console.log("Congrats your data was received from backend ):");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("One of the field is wrong or missing (:");
    }
    axios
      .get("http://localhost:3001/")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("You got an error in get axios");
        console.log(err);
      });
  }

  return (
    <div className="App-container">
      <div className="sideText">
        <div>
          <h2>Learn to code by watching others</h2>
        </div>
        <div>
          <p>
            See how experienced developers solve problems in real time Watching
            scripted tutorials is great, by understanding how developers think
            is invaluable.
          </p>
        </div>
      </div>

      <div className="form">
        <div className="card" id="trialCard">
          <div className="card-body">
            {" "}
            <b className="trialSpan">Try it free 7 days</b> then $20/mo.
            thereafter
          </div>
        </div>
        <form className="bg-light" id="formControl">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={user.firstName}
              onChange={setFirstName}
            />
            {user.firstName === "" ? <i>first name cannot be empty</i> : ""}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              onChange={setLastName}
            />
            {user.lastName === "" ? <i>Last Name cannot be empty</i> : null}
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="Email Address"
              onChange={setEmail}
            />
            {user.email === "" ? <i>Email cannot be empty</i> : null}
            {user.email === "invalid" ? (
              <i>Looks like this is not an email </i>
            ) : null}
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              onChange={setPassword}
            />
            {user.password === "" ? <i>Password cannot be empty</i> : ""}
          </div>
          <div>
            <button
              onClick={onSignUp}
              type="button"
              className="btn btn-success btn-lg btn-block"
            >
              CLAIM YOUR FREE TRAIL
            </button>
          </div>
          <div>
            <p className="claim-trial-footer">
              <span style={{ color: " hsl(246, 25%, 77%)" }}>
                By clicking the button, you are agreeing to our{" "}
              </span>{" "}
              <b style={{ color: "hsl(0, 100%, 74%)" }}>Terms and Services</b>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
