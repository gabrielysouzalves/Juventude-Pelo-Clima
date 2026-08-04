import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Loja.css";

function Loja() {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [toast, setToast] = useState(false);
  const [carregando, setCarregando] = useState(true);
  function obterImagem(produto) {
  const nome = produto.nome.toLowerCase();

  if (nome.includes("camiseta")) {
    return "/camiseta.jfif";
  }

  if (nome.includes("ecobag")) {
    return "/ecobag.jfif";
  }

  return "/sem-imagem.png";
}

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await fetch("http://localhost:8080/produtos/disponiveis");
        const dados = await resposta.json();
        setProdutos(dados);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarProdutos();
  }, []);

  function adicionarCarrinho(produto) {
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];

    localStorage.setItem(
      "carrinho",
      JSON.stringify([...carrinhoAtual, produto])
    );

    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 2500);
  }

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="loja-page">
      <div className={toast ? "toast show" : "toast"}>
        Item adicionado ao carrinho!
      </div>

      <header className="loja-header">
        <div className="loja-container loja-header-content">
          <button className="back-btn" onClick={() => navigate("/")}>
            ← Voltar
          </button>

          <div className="loja-logo">Loja</div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Pesquisar produtos..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
            <button>Busca</button>
          </div>

          <div className="cart">Carrinho</div>
        </div>
      </header>

      <section className="loja-main">
        <aside className="filters">
          <h2>Filtros</h2>

          <div className="filter-group">
            <h3>Categorias</h3>

            <label><input type="checkbox" /> Camisetas</label>
            <label><input type="checkbox" /> Moletons</label>
            <label><input type="checkbox" /> Acessórios</label>
            <label><input type="checkbox" /> Sustentáveis</label>
          </div>

          <div className="filter-group">
            <h3>Entrega</h3>

            <label><input type="checkbox" /> Frete Grátis</label>
            <label><input type="checkbox" /> Full</label>
          </div>
        </aside>

        <div className="products-area">
          <div className="result-text">
            Resultado da pesquisa para <strong>'{pesquisa || "todos"}'</strong>
          </div>

          {carregando ? (
            <h2>Carregando produtos...</h2>
          ) : produtosFiltrados.length === 0 ? (
            <h2>Nenhum produto encontrado.</h2>
          ) : (
            <div className="products-grid">
              {produtosFiltrados.map((produto) => (
                <div className="product-card" key={produto.id}>
                 <img
  src={obterImagem(produto)}
  alt={produto.nome}
/>

                  <div className="product-info">
                    <div className="product-title">{produto.nome}</div>

                    <p className="product-description">
                      {produto.descricao}
                    </p>

                    <div className="price">
                      R$ {Number(produto.preco).toFixed(2)}
                    </div>

                    <button
                      className="buy-btn"
                      onClick={() => adicionarCarrinho(produto)}
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Loja;