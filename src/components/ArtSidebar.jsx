export default function ArtSidebar({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="art-overlay" onClick={onClose}>
      <div className="art-full-container" onClick={e => e.stopPropagation()}>
        
        <div className="art-full-media">
          {item.type === "image" ? (
            <img src={item.src} alt="" />
          ) : (
            <video 
              src={item.src}
              controls
              autoPlay
              playsInline
            />
          )}
        </div>

        <p className="art-description">{item.description}</p>
      </div>
    </div>
  );
}
