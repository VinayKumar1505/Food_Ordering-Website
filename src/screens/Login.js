import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate= useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('userEmail', credentials.email)
      localStorage.setItem('token', json.authToken)
      navigate("/");
    }
    else {
      alert("Enter Valid Credentials")
    }
  };

  function onChange(event) {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="btn"
            style={{ background: "rgba(51, 255, 167, 0.5)" }}
          >
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
             I' a new User
          </Link>
        </form>
      </div>
    </div>
  );
}
