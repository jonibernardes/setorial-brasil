import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Setor from "./pages/Setor";
import Rodape from "./components/Rodape";

export default function App() {
  return (
    <BrowserRouter basename="/setorial-brasil">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/br/:slug" element={<Setor />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Rodape />
    </BrowserRouter>
  );
}
