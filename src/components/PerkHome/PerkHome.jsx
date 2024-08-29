import "./PerkHome.css";
import { Link } from "react-router-dom";

export default function PerkHome({ perks }) {
  return (
    <div className="PerkHome">
      <h1>Available Perks</h1>
      <ul>
        {perks.map((perk) => (
          <li key={perk.name}>
            <Link to={`/perks/${perk.name}`}>{perk.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
