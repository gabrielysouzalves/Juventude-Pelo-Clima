import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GerenciarEventos.css";

function GerenciarEventos({ modo }) {
  const navigate = useNavigate();

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  const eventosSalvos = JSON.parse(localStorage.getItem("eventos")) || [];

const eventosBase = [
  ...eventosSalvos
];

  const eventoParaAlterar = eventosBase[0];

  const [titulo, setTitulo] = useState(
    modo === "alterar" ? eventoParaAlterar.titulo : ""
  );
  const [data, setData] = useState(
    modo === "alterar" ? eventoParaAlterar.data : ""
  );
  const [local, setLocal] = useState(
    modo === "alterar" ? eventoParaAlterar.local : ""
  );
  const [descricao, setDescricao] = useState(
    modo === "alterar" ? eventoParaAlterar.descricao : ""
  );
  const [imagemPreview, setImagemPreview] = useState(
    modo === "alterar" ? eventoParaAlterar.imagem : ""
  );

  function alterarImagem(e) {
    const arquivo = e.target.files[0];

    if (arquivo) {
      setImagemPreview(URL.createObjectURL(arquivo));
    }
  }

 function salvarEvento(e) {
  e.preventDefault();

  if (!titulo || !data || !local || !descricao) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const eventosSalvos = JSON.parse(localStorage.getItem("eventos")) || [];

  const novoEvento = {
    id: Date.now(),
    titulo,
    data,
    local,
    descricao,
    imagem: imagemPreview || "/imagem.png",
    organizadorId: usuarioLogado?.id
  };

  localStorage.setItem("eventos", JSON.stringify([...eventosSalvos, novoEvento]));

  alert("Evento criado com sucesso!");
  navigate("/meus-eventos");
}

  function editarEvento() {
    navigate("/alterar-evento");
  }

  const eventosFiltrados =
    modo === "meus"
      ? eventosBase.filter((evento) => evento.organizadorId === usuarioLogado?.id)
      : eventosBase;

  if (modo === "criar" || modo === "alterar") {
    return (
      <main className="eventos-page">
        <section className="eventos-form-card">
          <h1>{modo === "criar" ? "Criar Evento" : "Alterar Evento"}</h1>

          <p>
            {modo === "criar"
              ? "Cadastre um novo evento para a ONG."
              : "Atualize as informações do evento selecionado."}
          </p>

          <form onSubmit={salvarEvento}>
            {imagemPreview && (
              <div className="preview-box">
                <img src={imagemPreview} alt="Prévia do evento" />
              </div>
            )}

            <label>Banner do evento</label>
            <input type="file" accept="image/*" onChange={alterarImagem} />

            <label>Título do evento</label>
            <input
              type="text"
              placeholder="Digite o título do evento"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />

            <label>Data do evento</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />

            <label>Local do evento</label>
            <input
              type="text"
              placeholder="Digite o local do evento"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />

            <label>Descrição</label>
            <textarea
              placeholder="Digite a descrição do evento"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>

            <div className="eventos-form-buttons">
              <button
                type="button"
                className="btn-cancelar-evento"
                onClick={() => navigate("/")}
              >
                Cancelar
              </button>

              <button type="submit" className="btn-salvar-evento">
                {modo === "criar" ? "Criar Evento" : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="eventos-page">
      <section className="eventos-lista-container">
        <div className="eventos-lista-header">
          <h1>{modo === "meus" ? "Meus Eventos" : "Todos os Eventos"}</h1>

          <button
            className="btn-novo-evento"
            onClick={() => navigate("/criar-evento")}
          >
            Criar Evento
          </button>
        </div>

        <div className="eventos-grid-lista">
          {eventosFiltrados.map((evento) => (
            <div className="evento-lista-card" key={evento.id}>
              <img src={evento.imagem} alt={evento.titulo} />

              <div className="evento-lista-content">
                <span>{evento.data}</span>

                <h3>{evento.titulo}</h3>

                <p className="evento-local">{evento.local}</p>

                <p>{evento.descricao}</p>

                <button className="btn-editar-evento" onClick={editarEvento}>
                  Alterar evento
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default GerenciarEventos;