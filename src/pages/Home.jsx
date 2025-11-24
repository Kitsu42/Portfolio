import CardProject from "../components/CardProject";
import perfilFoto from "../assets/perfilFoto.png";

export default function Home() {
  return (
    <div className="container">

      <div className="profile-section">
        <img 
          src={perfilFoto}
          alt="Foto de Perfil"
          className="perfil-foto"
        />

        <div className="profile-text">
          <h1>Carlos Vinicius</h1>
          <p>Estudante de programação criando um portifolio</p>
        </div>
      </div>

      <h2>Projetos</h2>
      <CardProject title="Dowload de musica" desc="Um sistema simples para baixar musicar do youtube." link="#" />
    </div>
  );
}
