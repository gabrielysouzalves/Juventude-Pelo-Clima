import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function fazerLogin(e) {
    e.preventDefault();

    setErro("");

    if (!email.trim()) {
      setErro("O email é obrigatório.");
      return;
    }

    if (!senha.trim()) {
      setErro("A senha é obrigatória.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.trim(),
          senha: senha.trim()
        })
      });

      const dados = await resposta.text();

      if (!resposta.ok) {
        setErro(dados || "Email ou senha inválidos.");
        setCarregando(false);
        return;
      }

      const usuario = JSON.parse(dados);

      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

      navigate("/");
    } catch (error) {
      setErro("Erro ao conectar com o servidor.");
    }

    setCarregando(false);
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <img src="/icon.png" alt="Logo" className="auth-logo" />

        <h1>Entrar</h1>
        <p>Acesse sua conta da Juventude pelo Clima</p>

        <form onSubmit={fazerLogin} noValidate>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {erro && <span className="auth-error">{erro}</span>}

          <button type="submit" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <span>
          Não tem conta?{" "}
          <button className="link-button" onClick={() => navigate("/cadastro")}>
            Cadastre-se
          </button>
        </span>

        <button className="back-button" onClick={() => navigate("/")}>
          Voltar para início
        </button>
      </section>
    </main>
  );
}

export default Login;