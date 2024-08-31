import "./EditProfilePic.css";
import ProfilePics from "../../assets/data/profilepics.json";
import { useState } from "react";
import { updatePP } from "../../../utilities/account-api";

export default function EditProfilePic({ account, setAccount, setSettings }) {
  const [pic, setPic] = useState(account.pic);

  async function updatePic() {
    try {
      let response = await updatePP({ pic: pic });
      setAccount((prevAccount) => ({
        ...prevAccount,
        pic: response,
      }));

      setSettings((prevSettings) => ({
        ...prevSettings,
        epp: false,
      }));
    } catch (error) {
      console.error("error changing profile pic".error);
    }
  }

  return (
    <div className="SettingsBox">
      <h1>Change Profile Picture</h1>
      <p>Choose from the below options!</p>

      <div className="ProfilePicsOptions">
        {ProfilePics.map((profile, index) => (
          <div
            key={index}
            className={`ProfilePicOption ${
              pic === index ? "SelectedProfilePic" : ""
            }`}
            onClick={() => setPic(index)}
          >
            <img className="OptionPic" src={profile.img} alt={profile.name} />
            <p>{profile.name}</p>
          </div>
        ))}
      </div>

      <div className="SettingsBtns">
        <button
          onClick={() =>
            setSettings((prevSettings) => ({
              ...prevSettings,
              epp: false,
            }))
          }
          className="SettingsBtn Cancel"
        >
          Cancel
        </button>
        <button className="SettingsBtn Update" onClick={updatePic}>
          Update
        </button>
      </div>
    </div>
  );
}
