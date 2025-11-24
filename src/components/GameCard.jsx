export default function GameCard({ title, folder }) {
  return (
    <a 
      href={`${import.meta.env.BASE_URL}src/Games/${folder}/index.html`}
      target="_blank"
      rel="noopener noreferrer"
      className="game-card"
    >
      <div className="game-card-content">
        <h3>{title}</h3>
      </div>
    </a>
  );
}
