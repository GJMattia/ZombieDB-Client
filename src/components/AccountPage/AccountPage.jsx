import "./AccountPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { verifyEmail } from "../../../utilities/user-api";
import Jug from "../../assets/images/perks/jug.webp";
import { getAccount } from "../../../utilities/account-api";
import Perks from "../../assets/data/profilepics.json";

export default function AccountPage({ user, setUser }) {
  const [account, setAccount] = useState(null);
  let [code, setCode] = useState("");
  let [error, setError] = useState("please verify");

  useEffect(function () {
    async function getAccountData() {
      try {
        const response = await getAccount();
        setAccount(response);
      } catch (error) {
        console.error("Error Fetching Questions", error);
      }
    }
    getAccountData();
  }, []);

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
      {account && (
        <>
          <div className="Profile">
            <img className="ProfilePicture" src={Perks[account.pic].img} />
            <h1>{user.name}</h1>
            <p>Created at {user.createdAt}</p>
            <p>
              Birthday: {user.birthday.mm}/{user.birthday.dd}/
              {user.birthday.yyyy}
            </p>
            <p>Verified: {user.verified.toString()}</p>
          </div>

          <div className="Bio">
            <h1>Bio</h1>
            <p>{account.bio}</p>
          </div>

          <div className="SocialMedia">
            <h1>Social Media</h1>
            <p>{account.social[0]}</p>
            <p>{account.social[1]}</p>
          </div>

          <div className="TopMaps">
            <h1>Top 3 Maps</h1>
            <p>{account.topmaps[0]}</p>
            <p>{account.topmaps[1]}</p>
            <p>{account.topmaps[2]}</p>
          </div>

          <div className="TopWW">
            <h1>Top 3 Wonder Weapons</h1>
            <p>{account.topww[0]}</p>
            <p>{account.topww[1]}</p>
            <p>{account.topww[2]}</p>
          </div>
        </>
      )}

      {/* <ul className="PerkList">
        {Perks.map((perk, index) => (
          <li key={index}>
            <p>{perk.name}</p>
            <img className="ProfilePicture" src={perk.img} alt={perk.name} />
          </li>
        ))}
      </ul> */}
    </div>
  );
}
