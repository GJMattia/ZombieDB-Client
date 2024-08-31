import "./GameNav.css";
import { useNavigate } from "react-router-dom";

export default function GameNav() {
  const navigate = useNavigate();
  return (
    <div className="GameNav">
      <ul>
        <li onClick={() => navigate("/perks")}>Perks</li>
        <li onClick={() => navigate("/maps")}>Maps</li>
      </ul>
    </div>
  );
}
