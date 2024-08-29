import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../../utilities/user-services";
import AuthPage from "../Auth/AuthPage/AuthPage";
import NavBar from "../NavBar/NavBar";
import AccountPage from "../AccountPage/AccountPage";
import Home from "../Home/Home";
import Verify from "../Verify/Verify";
import PerkHome from "../PerkHome/PerkHome";
import PerkPage from "../PerkPage/PerkPage";
import Perks from "../../assets/data/perks.json";
import "./App.css";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/account"
          element={<AccountPage user={user} setUser={setUser} />}
        />
        <Route path="/login" element={<AuthPage setUser={setUser} />} />
        <Route
          path="/perks"
          element={<PerkHome user={user} setUser={setUser} perks={Perks} />}
        />
        <Route path="/perks/:perkName" element={<PerkPage perks={Perks} />} />

        <Route
          path="/verify"
          element={<Verify user={user} setUser={setUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
