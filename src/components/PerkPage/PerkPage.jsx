import "./PerkPage.css";
import { useParams } from "react-router-dom";

export default function PerkPage({ perks }) {
  const { perkName } = useParams();
  const perk = perks.find(
    (p) =>
      p.name.toLowerCase().replace(/\s+/g, "") ===
      perkName.toLowerCase().replace(/\s+/g, "")
  );

  if (!perk) {
    return <div className="PerkPage">Perk not found</div>;
  }

  return (
    <div className="PerkPage">
      <h1>{perk.name}</h1>

      <article className="PerkGrid">
        <p>{perk.des}</p>
        <section className="PerkInfo">
          <h3>{perk.name}</h3>
          <img className="PerkMachine" src={perk.machine} />
          <p>{perk.effect}</p>
          <p>Price: {perk.price}</p>
          <img className="PerkImg" src={perk.img} />
        </section>
      </article>
    </div>
  );
}
