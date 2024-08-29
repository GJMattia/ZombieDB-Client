import "./GameNav.css";
import { useNavigate } from "react-router-dom";

export default function GameNav() {
  const navigate = useNavigate();
  return (
    <div className="GameNav">
      <p onClick={() => navigate("/perks")}>Perks</p>
    </div>
  );
}
