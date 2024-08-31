import "./AccountPage.css";
import { useState, useEffect } from "react";
import { getAccount } from "../../../utilities/account-api";
import ProfilePics from "../../assets/data/profilepics.json";
import Perks from "../../assets/data/perks.json";
import { useNavigate } from "react-router-dom";
import Edit from "../../assets/images/icons/edit.png";
import EditProfilePic from "../EditProfilePic/EditProfilePic";
import EditPerks from "../EditPerks/EditPerks";

export default function AccountPage({ user, setUser }) {
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);

  const [settings, setSettings] = useState({
    epp: false,
    perks: false,
  });

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

  function formatDate(dateString) {
    const date = new Date(dateString);

    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const year = date.getUTCFullYear();

    return `${month}/${day}/${year}`;
  }

  const shouldBlur = Object.values(settings).includes(true);

  return (
    <div className="AccountPage">
      {settings.epp && (
        <EditProfilePic
          account={account}
          setAccount={setAccount}
          setSettings={setSettings}
        />
      )}

      {settings.perks && (
        <EditPerks
          account={account}
          setAccount={setAccount}
          setSettings={setSettings}
        />
      )}
      <div className={`AccountGrid ${shouldBlur ? "Blur" : ""}`}>
        {account && (
          <>
            <div className="Profile">
              <h1>{user.name}</h1>
              <img
                className="EditProfilePic"
                src={Edit}
                onClick={() =>
                  setSettings((prevSettings) => ({
                    ...prevSettings,
                    epp: true,
                  }))
                }
              />
              <img
                className="EditPerks"
                src={Edit}
                onClick={() =>
                  setSettings((prevSettings) => ({
                    ...prevSettings,
                    perks: true,
                  }))
                }
              />
              <div className="ProfileBox">
                <img
                  className="ProfilePicture"
                  src={ProfilePics[account.pic].img}
                />
              </div>
              <div className="AccountPerks">
                {account.perks.map((perkIndex, index) => (
                  <img
                    key={index}
                    src={Perks[perkIndex].img}
                    alt={`Perk ${perkIndex}`}
                  />
                ))}
              </div>

              <p>Account Created on {formatDate(user.createdAt)}</p>
              <p>
                Birthday: {user.birthday.mm}/{user.birthday.dd}/
                {user.birthday.yyyy}
              </p>
              <p>Verified: {user.verified.toString()}</p>
              {!user.verified && (
                <>
                  <p className="Red">
                    Your account is not verified, some of your functions will be
                    limited.
                  </p>
                  <button
                    className="VerifyBtn"
                    onClick={() => navigate("/verify")}
                  >
                    Click here to verify your email address!
                  </button>
                </>
              )}
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
      </div>
    </div>
  );
}
