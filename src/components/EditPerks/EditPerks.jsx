import "./EditPerks.css";
import Perks from "../../assets/data/perks.json";
import { useState } from "react";

export default function EditPerks({ account, setAccount, setSettings }) {
  const [perk, setPerk] = useState(0);

  return (
    <div className="SettingsBox">
      <h1>Select your favorite perks!</h1>
      <div className="PerkBox">
        <div className="Perk1">
          <h5>Current Perks:</h5>

          <div className="AccountPerks2">
            {account.perks.map((perkIndex, index) => (
              <img
                key={index}
                src={Perks[perkIndex].img}
                alt={`Perk ${perkIndex}`}
              />
            ))}
          </div>
          <p>Choose 4 perks from the selection below!</p>
          <div className="PerkSelection">
            {Perks.map((perk, index) => (
              <img
                key={index}
                src={perk.img}
                alt={`Perk ${index}`}
                onClick={() => setPerk(index)}
              />
            ))}
          </div>
        </div>
        <div className="Perk2">
          <h2>Selected Perk:</h2>

          <img className="SelectedPerk" src={Perks[perk].img} />
          <h4>{Perks[perk].name}</h4>
          <div className="SettingsBtns">
            <button className="SettingsBtn Cancel">Remove</button>
            <button className="SettingsBtn Update">Add</button>
          </div>
        </div>
      </div>
      <div className="SettingsBtns">
        <button
          className="SettingsBtn Cancel"
          onClick={() =>
            setSettings((prevSettings) => ({
              ...prevSettings,
              perks: false,
            }))
          }
        >
          Cancel
        </button>
        <button className="SettingsBtn Update">Update</button>
      </div>
    </div>
  );
}
