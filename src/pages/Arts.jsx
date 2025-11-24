import { useState } from "react";
import arts from "../data/arts";
import ArtCard from "../components/ArtCard";
import ArtSidebar from "../components/ArtSidebar";

export default function Arts() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="arts-container">
      
      <div className="arts-grid">
        {arts.map(item => (
          <ArtCard key={item.id} item={item} onSelect={setSelected} />
        ))}
      </div>

      <ArtSidebar item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
