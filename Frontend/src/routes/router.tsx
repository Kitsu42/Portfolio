import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/layout/Layout';

import Home from '../pages/Home/Home';
import Projects from '../pages/Projects/Projects';
import Articles from '../pages/articles/Articles';
import Games from '../pages/Games/Games';

// Componente temporário para páginas em construção
const UnderConstruction = () => {
  return (
    <div className="construction-page">
      <div className="construction-content">
        <span className="construction-icon">🚧</span>
        <h1>Em Construção</h1>
        <p>Esta página ainda está sendo desenvolvida.<br />Volte em breve para conferir o conteúdo!</p>
        
        <a href="/" className="back-home-btn">
          ← Voltar para a Home
        </a>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <UnderConstruction /> }, //<Projects />
      { path: "articles", element: <UnderConstruction /> }, //<Articles /> },
      { path: "games", element: <UnderConstruction /> }, //<Games /> },
      
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}