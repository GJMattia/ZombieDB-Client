import "./AccountPage.css";
import { useState } from "react";
import ProfilePics from "../../assets/data/profilepics.json";
import Perks from "../../assets/data/perks.json";
import { useNavigate } from "react-router-dom";
import Edit from "../../assets/images/icons/edit.png";
import EditProfilePic from "../EditProfilePic/EditProfilePic";
import EditPerks from "../EditPerks/EditPerks";
import EditBio from "../EditBio/EditBio";

export default function AccountPage({ user, account, setAccount }) {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    epp: false,
    perks: false,
    bio: false,
  });

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

      {settings.bio && (
        <EditBio
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
              <p className={user.verified ? "Green" : ""}>
                Verified: {user.verified.toString()}
              </p>
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

            <div className="Profile4">
              <div className="Bio">
                <img
                  className="EditBio"
                  src={Edit}
                  onClick={() =>
                    setSettings((prevSettings) => ({
                      ...prevSettings,
                      bio: true,
                    }))
                  }
                />
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}
