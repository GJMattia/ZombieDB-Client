import "./EditPerks.css";
import Perks from "../../assets/data/perks.json";
import { useState } from "react";
import { updatePerks } from "../../../utilities/account-api";

export default function EditPerks({ account, setAccount, setSettings }) {
  const [perk, setPerk] = useState(account.perks[0]);
  const [perks, setPerks] = useState(account.perks);

  async function savePerks() {
    try {
      let response = await updatePerks({ perks: perks });
      setAccount((prevAccount) => ({
        ...prevAccount,
        perks: response,
      }));

      setSettings((prevSettings) => ({
        ...prevSettings,
        perks: false,
      }));
    } catch (error) {
      console.error("error updating perks".error);
    }
  }

  const removePerk = () => {
    setPerks(perks.filter((p) => p !== perk));
  };

  const addPerk = () => {
    if (!perks.includes(perk) && perks.length < 4) {
      setPerks([...perks, perk]);
    }
  };
  return (
    <div className="SettingsBox">
      <h1>Select your favorite perks!</h1>
      <div className="PerkBox">
        <div className="Perk1">
          <h5>Current Perks:</h5>

          <div className="AccountPerks2">
            {perks.map((perkIndex, index) => (
              <img
                key={index}
                src={Perks[perkIndex].img}
                alt={`Perk ${perkIndex}`}
                onClick={() => setPerk(perkIndex)}
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
            <button onClick={removePerk} className="SettingsBtn Cancel">
              Remove
            </button>
            <button onClick={addPerk} className="SettingsBtn Update">
              Add
            </button>
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
        <button onClick={savePerks} className="SettingsBtn Update">
          Update
        </button>
      </div>
    </div>
  );
}
