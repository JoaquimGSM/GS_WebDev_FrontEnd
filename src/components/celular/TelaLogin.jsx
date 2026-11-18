import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

function TelaLogin({ onVoltar, onCriarConta }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");

  function validarFormulario(evento) {
    evento.preventDefault();

    setErro("");
    setAviso("");

    if (!email.trim() || !senha) {
      setErro("Preencha o e-mail e a senha.");
      return;
    }

    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(email.trim())) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve conter pelo menos 6 caracteres.");
      return;
    }

    // A autenticação real será implementada na Etapa 4.
    setAviso(
      "Dados validados. O login será ativado após a integração com o Supabase."
    );
  }

  function limparMensagens() {
    setErro("");
    setAviso("");
  }

  return (
    <section className="flex min-h-full flex-col bg-cityzer-fundo px-6 pb-8 pt-5">
      {/* Navegação */}
      <button
        type="button"
        onClick={onVoltar}
        className="flex w-fit cursor-pointer items-center gap-2 text-sm text-cityzer-suave transition-colors hover:text-cityzer-verde"
      >
        <ArrowLeft size={18} />
        Voltar
      </button>

      {/* Cabeçalho */}
      <div className="mb-8 mt-10">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cityzer-verde/30 bg-cityzer-verde/10">
          <LockKeyhole
            size={27}
            strokeWidth={1.6}
            className="text-cityzer-verde"
          />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-cityzer-texto">
          Bem-vindo de volta.
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-cityzer-suave">
          Entre na sua conta para acompanhar as condições
          das ruas da sua cidade.
        </p>
      </div>

      {/* Formulário */}
      <form
        onSubmit={validarFormulario}
        noValidate
        className="flex flex-col gap-5"
      >
        {/* E-mail */}
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-medium text-cityzer-texto"
          >
            E-mail
          </label>

          <div className="relative">
            <Mail
              size={18}
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cityzer-suave"
            />

            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(evento) => {
                setEmail(evento.target.value);
                limparMensagens();
              }}
              className="min-h-12 w-full rounded-xl border border-white/15 bg-cityzer-superficie/80 py-3 pl-12 pr-4 text-sm text-cityzer-texto outline-none transition-colors placeholder:text-cityzer-suave/50 focus:border-cityzer-verde"
            />
          </div>
        </div>

        {/* Senha */}
        <div>
          <label
            htmlFor="login-senha"
            className="mb-2 block text-sm font-medium text-cityzer-texto"
          >
            Senha
          </label>

          <div className="relative">
            <LockKeyhole
              size={18}
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-cityzer-suave"
            />

            <input
              id="login-senha"
              type={mostrarSenha ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(evento) => {
                setSenha(evento.target.value);
                limparMensagens();
              }}
              className="min-h-12 w-full rounded-xl border border-white/15 bg-cityzer-superficie/80 py-3 pl-12 pr-12 text-sm text-cityzer-texto outline-none transition-colors placeholder:text-cityzer-suave/50 focus:border-cityzer-verde"
            />

            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              aria-label={
                mostrarSenha ? "Ocultar senha" : "Mostrar senha"
              }
              aria-pressed={mostrarSenha}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-cityzer-suave hover:text-cityzer-verde"
            >
              {mostrarSenha ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>
        </div>

        {/* Mensagens de validação */}
        {erro && (
          <p
            role="alert"
            className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs leading-relaxed text-red-300"
          >
            {erro}
          </p>
        )}

        {aviso && (
          <p
            role="status"
            className="rounded-xl border border-cityzer-verde/30 bg-cityzer-verde/10 px-4 py-3 text-xs leading-relaxed text-cityzer-verde"
          >
            {aviso}
          </p>
        )}

        {/* Botão de entrada */}
        <button
          type="submit"
          className="mt-2 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cityzer-verde px-4 font-semibold text-cityzer-fundo transition-colors hover:bg-emerald-300"
        >
          Entrar
          <ArrowRight size={18} />
        </button>
      </form>

      {/* Link de cadastro */}
      <div className="mt-8 text-center">
        <p className="text-sm text-cityzer-suave">
          Ainda não possui uma conta?
        </p>

        <button
          type="button"
          onClick={onCriarConta}
          className="mt-2 cursor-pointer text-sm font-semibold text-cityzer-verde hover:underline"
        >
          Criar conta
        </button>
      </div>
    </section>
  );
}

export default TelaLogin;
