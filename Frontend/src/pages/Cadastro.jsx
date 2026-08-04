import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cadastro.css";

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function cadastrar(e) {
    e.preventDefault();

    setErro("");
    setSucesso("");

    if (!nome.trim()) {
      setErro("O nome é obrigatório.");
      return;
    }

    if (!email.trim()) {
      setErro("O email é obrigatório.");
      return;
    }

    if (!telefone.trim()) {
      setErro("O telefone é obrigatório.");
      return;
    }

    if (!senha.trim()) {
      setErro("A senha é obrigatória.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch("http://localhost:8080/auth/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          telefone: telefone.trim(),
          senha: senha.trim()
        })
      });

      const mensagem = await resposta.text();

      if (!resposta.ok) {
        setErro(mensagem);
        setCarregando(false);
        return;
      }

      setSucesso("Cadastro realizado com sucesso!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error("ERRO COMPLETO:", error);
      setErro("Erro ao conectar com o servidor: " + error.message);
    }

    setCarregando(false);
  }

  return (
    <main className="auth-page">
      <section className="auth-card cadastro-card">
        <img
          src="/icon.png"
          alt="Logo Juventude pelo Clima"
          className="auth-logo"
        />

        <h1>Criar Conta</h1>
        <p>Cadastre-se como voluntário</p>

        <form onSubmit={cadastrar} noValidate>
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {erro && <span className="auth-error">{erro}</span>}
          {sucesso && <span className="auth-success">{sucesso}</span>}

          <button type="submit" disabled={carregando}>
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <span>
          Já tem conta?{" "}
          <button
            type="button"
            className="link-button"
            onClick={() => navigate("/login")}
          >
            Entrar
          </button>
        </span>

        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/")}
        >
          Voltar para início
        </button>
      </section>
    </main>
  );
}

export default Cadastro;