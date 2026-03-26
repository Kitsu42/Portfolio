import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Articles from '../pages/articles/Articles';
import Games from '../pages/Games/Games';
import Projects from '../pages/Projects/Projects';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles" element={<Games />} />
        <Route path="/articles" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}