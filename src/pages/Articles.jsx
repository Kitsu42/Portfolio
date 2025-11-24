import ArticleCard from "../components/ArticleCard";

export default function Articles() {
  return (
    <div className="container">
      <h1>Artigos</h1>

      <ArticleCard 
        title="Titulo do artigo"
        summary="Um breve resumo do que eu falo aqui"
        file="criandoEssePortifolio.md"
      />
    </div>
  );
}
