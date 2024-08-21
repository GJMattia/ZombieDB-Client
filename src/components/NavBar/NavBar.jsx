import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as userService from "../../../utilities/user-services";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();
  let [accountList, setAccountList] = useState(false);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="NavBar">
      <h1 className="ZombieDB" onClick={() => navigate("/")}>
        ZombieDB
      </h1>
      <ul className="NavOptions">
        <li>Games ⋁</li>
        <li>Player Locator ⋁</li>
        <li>About ⋁</li>
      </ul>
      <h3 className="Account" onClick={() => setAccountList(!accountList)}>
        Account ⋁
      </h3>
      {accountList && (
        <ul className="AccountList">
          {user ? (
            <>
              <li>{user.name}</li>
              <li onClick={() => navigate("/account")}>Profile</li>
              <li onClick={handleLogOut}>Log Out</li>
            </>
          ) : (
            <li onClick={() => navigate("/login")}>Sign In</li>
          )}
        </ul>
      )}
    </nav>
  );
}
