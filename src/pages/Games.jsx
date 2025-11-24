import GameCard from "../components/GameCard";

export default function Games() {
  return (
    <div className="container">
      <h1>Games</h1>

      <GameCard 
        title="Doom Fire Pixel Art"
        folder="Doom-Fire-Pixelart"
      />

      <GameCard 
        title="Secret Number Game"
        folder="Secret-Number-Game-Alura-Projects"
      />

      <GameCard 
        title="Space Invaders"
        folder="Space Invaders"
      />

      <GameCard 
        title="Tetris in JS"
        folder="Tetris-in-JS"
      />
    </div>
  );
}