import "./AccountPage.css";
import { useState } from "react";
import axios from "axios";
import { verifyEmail } from "../../../utilities/user-api";
import Jug from "../../assets/images/perks/jug.webp";

export default function AccountPage({ user, setUser }) {
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
    <div className="AccountPage">
      <div className="Profile">
        <img className="ProfilePicture" src={Jug} />
        <h1>{user.name}</h1>
        <p>Created at {user.createdAt}</p>
        <p>
          Birthday: {user.birthday.mm}/{user.birthday.dd}/{user.birthday.yyyy}
        </p>
        <p>Verified: {user.verified.toString()}</p>
      </div>

      <div className="Bio">
        <h1>Bio</h1>
        <p>I am a zombies player that loves to go for high rounds</p>
      </div>

      <div className="SocialMedia">
        <h1>Social Media</h1>
        <p>twitch</p>
        <p>x</p>
      </div>

      <div className="TopMaps">
        <h1>Top 3 Maps</h1>
        <p>Origins</p>
        <p>Shino Numa</p>
        <p>Five</p>
      </div>

      <div className="TopWW">
        <h1>Top 3 Wonder Weapons</h1>
        <p>Ice Staff</p>
        <p>Thundergun</p>
        <p>Jet Gun</p>
      </div>
    </div>
  );
}
