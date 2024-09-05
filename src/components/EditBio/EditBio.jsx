import "./EditBio.css";
import { useState } from "react";
import { updateBio } from "../../../utilities/account-api";

export default function EditBio({ account, setAccount, setSettings }) {
  let [bio, setBio] = useState(account.bio);

  async function saveBio() {
    try {
      let response = await updateBio({ bio: bio });
      setAccount((prevAccount) => ({
        ...prevAccount,
        bio: response,
      }));

      setSettings((prevSettings) => ({
        ...prevSettings,
        bio: false,
      }));
    } catch (error) {
      console.error("error updating bio".error);
    }
  }

  const handleChange = (event) => {
    setBio(event.target.value);
  };
  return (
    <div className="SettingsBox">
      <h1>Create your bio</h1>
      <p>Write a little somehin!</p>
      <textarea
        className="BioArea"
        placeholder="Enter your bio here"
        minLength={1}
        maxLength={200}
        onChange={handleChange}
      ></textarea>
      <div className="SettingsBtns">
        <button
          onClick={() =>
            setSettings((prevSettings) => ({
              ...prevSettings,
              bio: false,
            }))
          }
          className="SettingsBtn Cancel"
        >
          Cancel
        </button>
        <button className="SettingsBtn Update" onClick={saveBio}>
          Update
        </button>
      </div>
    </div>
  );
}
