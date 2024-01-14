import React, { Component, useState } from "react";
import "../styles/App.css";

const App = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [selectedOption, setSelectedOption] = useState("Male");

  const [error, setError] = useState("");
  const [succes, setSucces] = useState("");

  function handleSubmitBtn() {
    if (!user.name || !user.email || !user.password || !user.phoneNumber) {
      setError("All fields are mandatory");
      setSucces("")
      return;
    }
    if (!/^[a-z0-9 ]+$/i.test(user.name)) {
      setError("Name is not alphanumeric");
      setSucces("")
      return;
    }
    if (!user.email.includes("@")) {
      setError("email must contain @");
      setSucces("")
      return;
    }
     
    if (
      ["Male", "female", "other"].indexOf(selectedOption) < 0
      // selectedOption != "Male" ||
      // selectedOption !== "female" ||
      // selectedOption !== "other"
    ) {
      setError("Please identify as male, female or others");
      setSucces("")
      return;
    }
    if (!/^[0-9]+$/.test(user.phoneNumber)) {
      setError("Phone Number must contain only numbers");
      setSucces("")
      return;
    }
    if (user.password.length < 6) {
      setError("Password must contain atleast 6 letters");
      setSucces("")
      return;
    }
    let name = user.email.split("@")
    setSucces(name[0].toUpperCase())
    setError("")
    
  }

  return (
    <div id="main">
      <label>Name</label>
      <input
        type="text"
        placeholder="Enter Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        data-testid="name"
      />
      <br />
      <br />

      <label>Email</label>
      <input
        type="email"
        placeholder="Enter Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        data-testid="email"
      />
      <br />
      <br />

      <label>Gender</label>
      <select
        name="gender"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        data-testid="gender"
      >
        <option value="">Select gender</option>
        <option value="Male">Male</option>
        <option value="female">female</option>
        <option value="other">other</option>
      </select>
      <br />
      <br />

      <label>Phone Number</label>
      <input
        type="text"
        value={user.phoneNumber}
        onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
        data-testid="phoneNumber"
      />
      <br />
      <br />

      <label>Password</label>
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        data-testid="password"
      />
      <br />
      <br />

      <button data-testid="submit" onClick={handleSubmitBtn}>
        Submit button{" "}
      </button>
      {error && <span>{error}</span>}
      {succes && <h2>Hello {succes}</h2>}
    </div>
  );
};

export default App;