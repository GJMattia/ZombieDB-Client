import "./PerksHome.css";
import { Link } from "react-router-dom";

export default function PerksHome({ perks }) {
  return (
    <div className="PerkHome">
      <h1>Available Perks</h1>
      <ul className="PerkList">
        {perks.map((perk) => (
          <li key={perk.name}>
            <img src={perk.img} />
            <Link to={`/perks/${perk.name}`}>{perk.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
