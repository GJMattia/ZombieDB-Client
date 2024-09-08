import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../../utilities/user-services";
import { getAccount } from "../../../utilities/account-api";
import AuthPage from "../Auth/AuthPage/AuthPage";
import NavBar from "../NavBar/NavBar";
import AccountPage from "../AccountPage/AccountPage";
import Home from "../Home/Home";
import Verify from "../Verify/Verify";
import PerksHome from "../PerksHome/PerksHome";
import PerkPage from "../PerkPage/PerkPage";
import Perks from "../../assets/data/perks.json";
import MapsHome from "../MapsHome/MapsHome";
import Feed from "../Feed/Feed";
import "./App.css";

function App() {
  const [user, setUser] = useState(getUser());
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (user) {
      async function getAccountData() {
        try {
          const response = await getAccount();
          setAccount(response);
        } catch (error) {
          console.error("Error Fetching Account Data", error);
        }
      }
      getAccountData();
    }
  }, [user]);

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/account"
          element={
            <AccountPage
              user={user}
              account={account}
              setAccount={setAccount}
            />
          }
        />

        <Route
          path="/feed"
          element={
            <Feed user={user} account={account} setAccount={setAccount} />
          }
        />
        <Route path="/login" element={<AuthPage setUser={setUser} />} />
        <Route
          path="/perks"
          element={<PerksHome user={user} setUser={setUser} perks={Perks} />}
        />
        <Route path="/perks/:perkName" element={<PerkPage perks={Perks} />} />

        <Route
          path="/maps"
          element={<MapsHome user={user} setUser={setUser} />}
        />

        <Route
          path="/verify"
          element={<Verify user={user} setUser={setUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
