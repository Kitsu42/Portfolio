import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Games from './pages/Games';
import GameDetail from './pages/GameDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Design from './pages/Design';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'articles', Component: Articles },
      { path: 'articles/:id', Component: ArticleDetail },
      { path: 'games', Component: Games },
      { path: 'games/:id', Component: GameDetail },
      { path: 'projects', Component: Projects },
      { path: 'projects/:id', Component: ProjectDetail },
      { path: 'design', Component: Design },
    ],
  },
]);
