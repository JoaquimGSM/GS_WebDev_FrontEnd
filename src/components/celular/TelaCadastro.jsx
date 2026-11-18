import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  UserRound,
  Mail,
  LockKeyhole,
  MapPin,
  Eye,
  EyeOff,
} from "lucide-react";

// Lista inicial de cidades para o protótipo
const cidades = [
  "São Paulo",
  "Cotia",
  "Itapevi",
  "Barueri",
  "Osasco",
  "Carapicuíba",
  "Santana de Parnaíba",
  "Itaquaquecetuba",
];

function TelaCadastro({ onVoltar, onEntrar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cidade, setCidade] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");

  function limparMensagens() {
    setErro("");
    setAviso("");
  }

  function validarCadastro(evento) {
    evento.preventDefault();
    limparMensagens();

    if (
      !nome.trim() ||
      !email.trim() ||
      !cidade ||
      !senha ||
      !confirmarSenha
    ) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (nome.trim().length < 3) {
      setErro("Digite seu nome completo.");
      return;
    }

    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(email.trim())) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (!cidades.includes(cidade)) {
      setErro("Selecione uma cidade válida.");
      return;
    }

    if (senha.length < 8) {
      setErro("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    // A criação da conta será implementada no Supabase.
    // Não armazenar senhas no localStorage.

    setAviso(
      "Dados validados! O cadastro será ativado após a integração com o Supabase."
    );
  }

  const estiloCampo =
    "min-h-11 w-full rounded-xl border border-white/15 " +
    "bg-cityzer-superficie/80 py-3 pl-11 pr-4 " +
    "text-sm text-cityzer-texto outline-none " +
    "placeholder:text-cityzer-suave/50 " +
    "focus:border-cityzer-verde";

  const estiloLabel =
    "mb-2 block text-xs font-medium text-cityzer-texto";

  return (
    <section className="flex min-h-full flex-col bg-cityzer-fundo px-5 pb-7 pt-4">

      {/* Voltar */}
      <button
        type="button"
        onClick={onVoltar}
        className="flex w-fit cursor-pointer items-center gap-2 text-sm text-cityzer-suave hover:text-cityzer-verde"
      >
        <ArrowLeft size={18} />
        Voltar
      </button>

      {/* Cabeçalho */}
      <div className="mb-6 mt-7">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cityzer-verde/30 bg-cityzer-verde/10">
          <UserRound
            size={24}
            className="text-cityzer-verde"
          />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-cityzer-texto">
          Criar conta<span className="text-cityzer-verde">.</span>
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-cityzer-suave">
          Faça parte da comunidade que ajuda a melhorar
          a mobilidade urbana.
        </p>
      </div>

      {/* Formulário */}
      <form
        onSubmit={validarCadastro}
        noValidate
        className="flex flex-col gap-4"
      >

        {/* Nome */}
        <div>
          <label htmlFor="cadastro-nome" className={estiloLabel}>
            Nome completo
          </label>

          <div className="relative">
            <UserRound
              size={17}
              aria-hidden="true"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cityzer-suave"
            />

            <input
              id="cadastro-nome"
              type="text"
              autoComplete="name"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                limparMensagens();
              }}
              className={estiloCampo}
            />
          </div>
        </div>

        {/* E-mail */}
        <div>
          <label htmlFor="cadastro-email" className={estiloLabel}>
            E-mail
          </label>

          <div className="relative">
            <Mail
              size={17}
              aria-hidden="true"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cityzer-suave"
            />

            <input
              id="cadastro-email"
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                limparMensagens();
              }}
              className={estiloCampo}
            />
          </div>
        </div>

        {/* Cidade */}
        <div>
          <label htmlFor="cadastro-cidade" className={estiloLabel}>
            Cidade
          </label>

          <div className="relative">
            <MapPin
              size={17}
              aria-hidden="true"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cityzer-suave"
            />

            <select
              id="cadastro-cidade"
              value={cidade}
              onChange={(e) => {
                setCidade(e.target.value);
                limparMensagens();
              }}
              className={`${estiloCampo} cursor-pointer pr-3`}
            >
              <option value="">Selecione sua cidade</option>

              {cidades.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Senha */}
        <div>
          <label htmlFor="cadastro-senha" className={estiloLabel}>
            Senha
          </label>

          <div className="relative">
            <LockKeyhole
              size={17}
              aria-hidden="true"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cityzer-suave"
            />

            <input
              id="cadastro-senha"
              type={mostrarSenha ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Mínimo de 8 caracteres"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                limparMensagens();
              }}
              className={`${estiloCampo} pr-11`}
            />

            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              aria-label={
                mostrarSenha ? "Ocultar senhas" : "Mostrar senhas"
              }
              aria-pressed={mostrarSenha}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center text-cityzer-suave hover:text-cityzer-verde"
            >
              {mostrarSenha ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Confirmar senha */}
        <div>
          <label
            htmlFor="cadastro-confirmar"
            className={estiloLabel}
          >
            Confirmar senha
          </label>

          <div className="relative">
            <LockKeyhole
              size={17}
              aria-hidden="true"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cityzer-suave"
            />

            <input
              id="cadastro-confirmar"
              type={mostrarSenha ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Repita sua senha"
              value={confirmarSenha}
              onChange={(e) => {
                setConfirmarSenha(e.target.value);
                limparMensagens();
              }}
              className={estiloCampo}
            />
          </div>
        </div>

        {/* Erro */}
        {erro && (
          <p
            role="alert"
            className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-xs text-red-300"
          >
            {erro}
          </p>
        )}

        {/* Aviso */}
        {aviso && (
          <p
            role="status"
            className="rounded-xl border border-cityzer-verde/30 bg-cityzer-verde/10 p-3 text-xs leading-relaxed text-cityzer-verde"
          >
            {aviso}
          </p>
        )}

        {/* Enviar */}
        <button
          type="submit"
          className="mt-3 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cityzer-verde font-semibold text-cityzer-fundo transition-colors hover:bg-emerald-300"
        >
          Criar conta
          <ArrowRight size={18} />
        </button>
      </form>

      {/* Ir para login */}
      <div className="mt-6 text-center">
        <p className="text-sm text-cityzer-suave">
          Já possui uma conta?
        </p>

        <button
          type="button"
          onClick={onEntrar}
          className="mt-2 cursor-pointer text-sm font-semibold text-cityzer-verde hover:underline"
        >
          Entrar
        </button>
      </div>
    </section>
  );
}

export default TelaCadastro;
