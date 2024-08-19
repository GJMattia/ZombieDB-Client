import { useState } from "react";
import * as usersService from "../../../../utilities/user-services";
import "./LoginForm.css";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError("Log In Failed - Try Again");
    }
  }

  return (
    <div className="LoginPage">
      <h1 className="Logo">ZombieDB</h1>
      <h1 className="LoginTitle">Log in</h1>
      <p>Enter the email and password for your ZombieDB account.</p>

      <form className="LoginForm" autoComplete="off" onSubmit={handleSubmit}>
        <input
          placeholder="Email address"
          minLength="5"
          maxLength="20"
          type="text"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Password"
          minLength="5"
          maxLength="20"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button
          className={`LoginFormBtn ${
            credentials.password.length < 6 ? "NotYet" : ""
          }`}
          type="submit"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
