import "./MainPage.css";
import { useState } from "react";
import axios from "axios";
import { verifyEmail } from "../../../utilities/user-api";

export default function MainPage({ user, setUser }) {
  let [code, setCode] = useState("");
  let [error, setError] = useState("please verify");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setCode(newValue);
  };

  async function verify() {
    try {
      let response = await verifyEmail({ code: code });
      setError(response.message);
      setUser(response.user);
      console.log(response);
    } catch (error) {
      console.error("error verifying".error);
    }
  }

  const sendVerificationEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4741/send-verification-email",
        {
          email: user.email,
          code: user.code,
        }
      );
      setError("Email sent successfully");
      console.log("Email sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="MainPage">
      <p>Hello {user.name}</p>
      <p>Your email is {user.email}</p>

      <p>Created at {user.createdAt}</p>

      <p>
        Birthday: {user.birthday.mm}/{user.birthday.dd}/{user.birthday.yyyy}
      </p>

      <p>Verified: {user.verified.toString()}</p>
      <p>Code: {user.code}</p>

      <button onClick={sendVerificationEmail}>
        Would you like to verify your account?
      </button>

      <input
        type="text"
        maxLength="4"
        className="Verify"
        onChange={handleChange}
      />
      <button onClick={verify}>Verify my Email</button>
      <p>{error}</p>
    </div>
  );
}
