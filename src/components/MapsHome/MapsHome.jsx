import "./MapsHome.css";
import Maps from "../../assets/data/maps.json";

export default function MapsHome() {
  return (
    <div className="MapsHome">
      <h1>Maps</h1>
      <ul className="MapsList">
        {Maps.map((map, index) => (
          <li key={index}>
            <img className="MapImg" src={map.img} alt={map.name} />
            <p>{map.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
