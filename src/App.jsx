import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Arts from "./pages/Arts";
import Articles from "./pages/Articles";
import Footer from "./components/Footer";


export default function App() {
return (
<BrowserRouter>
<Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/games" element={<Games />} />
<Route path="/arts" element={<Arts />} />
<Route path="/artigos" element={<Articles />} />
</Routes>
<Footer />
</BrowserRouter>
);
}