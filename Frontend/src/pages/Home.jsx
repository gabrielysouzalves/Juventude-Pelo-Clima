import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaUserCircle
} from "react-icons/fa";

import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const [menuAberto, setMenuAberto] = useState(false);
  const [slideAtual, setSlideAtual] = useState(0);

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const isOrganizador = usuarioLogado?.tipoUsuario === "ORGANIZADOR";

  const slidesVoluntario = [
    {
      titulo: "Quem Somos",
      texto:
        "A Juventude pelo Clima é uma ONG formada por jovens comprometidos com a preservação ambiental, educação climática e ações sustentáveis.",
      imagem: "/imagem.png",
      botao: "Conhecer a ONG"
    },
    {
      titulo: "Próximo Evento",
      texto:
        "Participe do nosso próximo evento e ajude a fazer a diferença. Confirme sua presença e venha construir um futuro mais sustentável conosco.",
      imagem: "/imagem3.png",
      botao: "Marcar Presença"
    },
    {
      titulo: "Nossa Comunidade",
      texto:
        "Conheça o pessoal da ONG Juventude pelo Clima e veja como a união de jovens pode transformar realidades.",
      imagem: "/imagem2.jpg",
      botao: "Ver Mais"
    }
  ];

  useEffect(() => {
    if (!usuarioLogado) return;

    const intervalo = setInterval(() => {
      setSlideAtual((slideAnterior) =>
        slideAnterior === slidesVoluntario.length - 1 ? 0 : slideAnterior + 1
      );
    }, 4000);

    return () => clearInterval(intervalo);
  }, [usuarioLogado]);

  function sair() {
    localStorage.removeItem("usuarioLogado");
    setMenuAberto(false);
    navigate("/");
    window.location.reload();
  }

  function acaoSlide() {
    if (slideAtual === 0) {
      alert("Página Quem Somos em breve");
    } else if (slideAtual === 1) {
      alert("Presença marcada em breve");
    } else {
      alert("Galeria da ONG em breve");
    }
  }

  function acaoEvento() {
    if (!usuarioLogado) {
      navigate("/cadastro");
      return;
    }

    if (isOrganizador) {
      navigate("/alterar-evento");
      return;
    }

    alert("Inscrição em evento em breve");
  }

  return (
    <>
      <header>
        <div className="container header-content">
          <div className="logo">
            <img
              src="/icon.png"
              alt="Logo Juventude pelo Clima"
              className="logo-img"
            />

            <h1>Juventude pelo Clima</h1>
          </div>

          <nav>
            <ul>
              {!isOrganizador ? (
                <>
                  <li><button className="nav-button" onClick={() => navigate("/")}>Início</button></li>
                  <li><button className="nav-button" onClick={() => navigate("/")}>Eventos</button></li>
                  <li><button className="nav-button" onClick={() => navigate("/")}>Doações</button></li>
                  <li><button className="nav-button" onClick={() => navigate("/")}>Contato</button></li>
                  <li><button className="nav-button" onClick={() => navigate("/loja")}>Loja</button></li>
                </>
              ) : (
                <>
                  <li><button className="nav-button" onClick={() => navigate("/")}>Início</button></li>
                  <li><button className="nav-button" onClick={() => navigate("/todos-eventos")}>Todos Eventos</button></li>
                  <li><button className="nav-button" onClick={() => navigate("/meus-eventos")}>Meus Eventos</button></li>
                  <li><button className="nav-button" onClick={() => navigate("/criar-evento")}>Criar Evento</button></li>
                </>
              )}
            </ul>
          </nav>

          <div className="auth-buttons">
            {!usuarioLogado ? (
              <>
                <button
                  className="btn btn-login"
                  onClick={() => navigate("/login")}
                >
                  Entrar
                </button>

                <button
                  className="btn btn-register"
                  onClick={() => navigate("/cadastro")}
                >
                  Cadastrar
                </button>
              </>
            ) : (
              <div className="user-menu">
                <button
                  className="user-icon-button"
                  onClick={() => setMenuAberto(!menuAberto)}
                >
                  <FaUserCircle />
                </button>

                {menuAberto && (
                  <div className="dropdown-menu">
                    <p className="user-name">{usuarioLogado.nome}</p>

                    <button onClick={() => alert("Dados cadastrais em breve")}>
                      Dados cadastrais
                    </button>

                    <button
                      onClick={() =>
                        isOrganizador
                          ? navigate("/meus-eventos")
                          : alert("Eventos inscritos em breve")
                      }
                    >
                      {isOrganizador ? "Eventos criados" : "Eventos inscritos"}
                    </button>

                    <button className="logout-button" onClick={sair}>
                      Sair
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="hero">
        {!usuarioLogado ? (
          <>
            <img
              src="/imagem.png"
              alt="Preservação ambiental"
              className="hero-image"
            />

            <div className="hero-overlay"></div>

            <div className="hero-content">
              <h2>Juntos pela preservação do nosso planeta</h2>

              <p>
                A Juventude pelo Clima atua na conservação de ecossistemas,
                educação ambiental e promoção de práticas sustentáveis.
                Faça parte desta causa!
              </p>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/cadastro")}
              >
                Junte-se a nós
              </button>
            </div>
          </>
        ) : (
          <>
            <img
              src={slidesVoluntario[slideAtual].imagem}
              alt={slidesVoluntario[slideAtual].titulo}
              className="hero-image"
            />

            <div className="hero-overlay"></div>

            <div className="hero-content hero-slide-content">
              <h2>{slidesVoluntario[slideAtual].titulo}</h2>

              <p>{slidesVoluntario[slideAtual].texto}</p>

              <button className="btn btn-primary" onClick={acaoSlide}>
                {slidesVoluntario[slideAtual].botao}
              </button>

              <div className="slide-dots">
                {slidesVoluntario.map((slide, index) => (
                  <span
                    key={index}
                    className={slideAtual === index ? "dot active-dot" : "dot"}
                    onClick={() => setSlideAtual(index)}
                  ></span>
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      <section className="events-section">
        <div className="container">
          <div className="section-title">
            <h2>{isOrganizador ? "Todos os Eventos" : "Próximos Eventos"}</h2>
            <p>
              {isOrganizador
                ? "Gerencie os eventos cadastrados na ONG"
                : "Participe das nossas atividades e faça a diferença"}
            </p>
          </div>

          <div className="events-grid">
            <div className="event-card">
              <img
                src="/imagem1.jfif"
                alt="Mutirão de limpeza"
                className="event-image"
              />

              <div className="event-content">
                <span className="event-date">23 de Outubro, 2025</span>

                <h3>Venha conhecer o Juventude!</h3>

                <p>
                  O Juventude pelo Clima irá se apresentar no Aquário da
                  Biblioteca da UNESP Franca.
                </p>

                <button className="btn btn-event" onClick={acaoEvento}>
                  {isOrganizador ? "Alterar evento" : "Participar"}
                </button>
              </div>
            </div>

            <div className="event-card">
              <img
                src="/imagem3.png"
                alt="Plantio de árvores"
                className="event-image"
              />

              <div className="event-content">
                <span className="event-date">01 de Novembro, 2025</span>

                <h3>Mutirão de Plantio - Projeto Buritis</h3>

                <p>
                  Ajude-nos a reintroduzir o buriti em áreas de nascentes e
                  proteção ambiental em Franca.
                </p>

                <button className="btn btn-event" onClick={acaoEvento}>
                  {isOrganizador ? "Alterar evento" : "Participar"}
                </button>
              </div>
            </div>

            <div className="event-card">
              <img
                src="/imagem2.jpg"
                alt="Palestra ambiental"
                className="event-image"
              />

              <div className="event-content">
                <span className="event-date">30 de Outubro, 2025</span>

                <h3>Clima nas Escolas - Esquadrão da COP</h3>

                <p>Apresentação do Juventude nas escolas.</p>

                <button className="btn btn-event" onClick={acaoEvento}>
                  {isOrganizador ? "Alterar evento" : "Participar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {!isOrganizador && (
        <section className="donation-section">
          <div className="container">
            <div className="donation-card">
              <h2>Faça uma Doação</h2>

              <p>
                Sua contribuição ajuda a financiar projetos ambientais, ações
                educativas e eventos da Juventude pelo Clima.
              </p>

              <label>Valor da doação (R$)</label>

              <input type="number" placeholder="Digite o valor" min="1" />

              <button className="btn btn-donation">Doar Agora</button>
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-column">
            <h3>Juventude pelo Clima</h3>

            <p>
              Trabalhamos pela preservação ambiental e promoção de práticas
              sustentáveis para um futuro melhor.
            </p>

            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>

              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedinIn />
              </a>

              <a
                href="https://wa.me/5516999999999"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Links Rápidos</h3>

            <ul>
              <li>Início</li>
              <li>Sobre Nós</li>
              <li>Eventos</li>
              <li>Doações</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Contato</h3>

            <p>Email: contato@juventudepeloclima.org</p>
            <p>Telefone: (16) 99999-9999</p>
            <p>Endereço: Franca - SP</p>
          </div>
        </div>

        <div className="footer-bottom">© 2025 Juventude pelo Clima</div>
      </footer>
    </>
  );
}

export default Home;