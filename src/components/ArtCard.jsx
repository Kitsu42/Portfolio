export default function ArtCard({ item, onSelect }) {
  return (
    <div className="art-card" onClick={() => onSelect(item)}>
      {item.type === "image" ? (
        <img src={item.src} alt="" className="art-media" />
      ) : (
        <video src={item.src} className="art-media" muted loop />
      )}
    </div>
  );
}
