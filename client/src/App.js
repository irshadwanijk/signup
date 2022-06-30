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
    });
  }
  function setLastName(e) {
    setUser((user) => {
      user.lastName = e.target.value;
    });
  }

  function setPassword(e) {
    setUser((user) => {
      user.password = e.target.value;
    });
  }

  function setEmail(e) {
    setUser((user) => {
      user.email = e.target.value;
    });
  }

  function checkFirstName(e) {
    if (!user.firstName) {
      let ele = document.getElementById("fNameErr");
      if (ele !== null) {
        ele.innerText = "First Name cannot be empty";
      }
    }
  }
  function checkLastName(e) {
    if (!user.lastName) {
      let ele = document.getElementById("lNameErr");
      if (ele !== null) {
        ele.innerText = "Last Name cannot be empty";
      }
    }
  }
  function checkEmail(e) {
    console.log(user.email);
    const evalEmail = user.email.match(
      /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/
    );
    let ele = document.getElementById("emailErr");

    if (!user.email) {
      if (ele !== null) {
        ele.innerText = "Email cannot be empty";
      }
    }
    if (!evalEmail) {
      if (ele !== null) {
        ele.innerText = "Invalid Email Id";
      }
    }
  }

  function checkPassword(e) {
    let ele = document.getElementById("passErr");

    if (!user.password) {
      if (ele !== null) {
        ele.innerText = "Password cannot be empty";
      }
    } else {
      if (ele !== null) {
        ele.innerText = "";
      }
    }

    if (user.password.length < 8) {
      if (ele !== null) {
        ele.innerText = "Password must be at least 8 characters";
      }
    }
  }

  function onSignUp(e) {
    e.preventDefault();
    console.log(
      user.firstName,
      " ",
      user.lastName,
      " ",
      user.email,
      " ",
      user.password
    );
    let userEnteredData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
    if (
      user.firstName &&
      user.lastName &&
      user.email.match(/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/) &&
      user.password.length > 8
    ) {
      axios
        .post("http://localhost:3001/signup", userEnteredData)
        .then((res) => {
          console.log(res.data);
          console.log("Congrats your data was received from backend ):");
          let ele = document.getElementById("signUpMsg");
          if (ele !== null) {
            ele.innerText = "User Created Successfully ):";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let ele = document.getElementById("signUpMsg");
      if (ele !== null) {
        ele.innerText = "Please provide correct details";
      }
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
              onBlur={checkFirstName}
              onKeyPress={(e) => {
                if (e.key === "Tab") {
                  checkFirstName();
                }
              }}
            />
            <i id="fNameErr">{user.firstName ? "" : null}</i>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              onChange={setLastName}
              onBlur={checkLastName}
              onKeyPress={(e) => {
                if (e.key === "Tab") {
                  checkLastName();
                }
              }}
            />
            <i id="lNameErr"> {user.lastName ? "" : null}</i>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="Email Address"
              onChange={setEmail}
              onBlur={checkEmail}
              onKeyPress={(e) => {
                if (e.key === "Tab") {
                  checkEmail();
                }
              }}
            />
            <i id="emailErr">{user.email ? "" : null}</i>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              onChange={setPassword}
              onBlur={checkPassword}
              onKeyPress={(e) => {
                if (e.key === "Tab") {
                  checkPassword();
                }
              }}
            />
            <i id="passErr">{user.password ? "" : null}</i>
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
          <div>
            <i
              id="signUpMsg"
              style={{ marginLeft: "4rem", fontSize: "0.6rem" }}
            ></i>
          </div>
        </form>
      </div>
    </div>
  );
}
