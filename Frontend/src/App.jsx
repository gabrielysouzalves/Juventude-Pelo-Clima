import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import GerenciarEventos from "./pages/GerenciarEventos";
import Loja from "./pages/Loja";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/criar-evento" element={<GerenciarEventos modo="criar" />} />
<Route path="/alterar-evento" element={<GerenciarEventos modo="alterar" />} />
<Route path="/meus-eventos" element={<GerenciarEventos modo="meus" />} />
<Route path="/todos-eventos" element={<GerenciarEventos modo="todos" />} />
<Route path="/loja" element={<Loja />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;