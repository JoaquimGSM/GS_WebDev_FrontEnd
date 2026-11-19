import { useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  LoaderCircle,
} from "lucide-react";

import { supabase } from "../../servicos/supabase";

function TelaLogin({ onVoltar, onCriarConta }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] =
    useState(false);

  const [carregando, setCarregando] =
    useState(false);

  const [erro, setErro] = useState("");

  function limparErro() {
    setErro("");
  }

  async function realizarLogin(evento) {
    evento.preventDefault();
    setErro("");

    const emailLimpo = email.trim().toLowerCase();

    if (!emailLimpo || !senha) {
      setErro("Preencha o e-mail e a senha.");
      return;
    }

    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(emailLimpo)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    setCarregando(true);

    try {
      const { error } =
        await supabase.auth.signInWithPassword({
          email: emailLimpo,
          password: senha,
        });

      if (error) {
        if (
          error.message.toLowerCase().includes(
            "email not confirmed"
          )
        ) {
          setErro(
            "Confirme seu e-mail antes de entrar."
          );
        } else if (
          error.message.toLowerCase().includes(
            "invalid login credentials"
          )
        ) {
          setErro(
            "E-mail ou senha inválidos."
          );
        } else {
          setErro(
            "Não foi possível entrar: " +
            error.message
          );
        }

        return;
      }

      // O Aplicativo.jsx detectará a sessão autenticada
      // e abrirá o mapa automaticamente.
    } catch {
      setErro(
        "Erro de conexão. Verifique sua internet e tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="flex min-h-full flex-col bg-cityzer-fundo px-6 pb-8 pt-5">

      {/* Voltar */}
      <button
        type="button"
        onClick={onVoltar}
        disabled={carregando}
        className="flex w-fit cursor-pointer items-center gap-2 text-sm text-cityzer-suave hover:text-cityzer-verde disabled:opacity-50"
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
          Entre na sua conta para acompanhar as
          condições das ruas da sua cidade.
        </p>
      </div>

      {/* Login */}
      <form
        onSubmit={realizarLogin}
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
              disabled={carregando}
              onChange={(evento) => {
                setEmail(evento.target.value);
                limparErro();
              }}
              className="min-h-12 w-full rounded-xl border border-white/15 bg-cityzer-superficie/80 py-3 pl-12 pr-4 text-sm text-cityzer-texto outline-none transition-colors placeholder:text-cityzer-suave/50 focus:border-cityzer-verde disabled:opacity-60"
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
              disabled={carregando}
              onChange={(evento) => {
                setSenha(evento.target.value);
                limparErro();
              }}
              className="min-h-12 w-full rounded-xl border border-white/15 bg-cityzer-superficie/80 py-3 pl-12 pr-12 text-sm text-cityzer-texto outline-none transition-colors placeholder:text-cityzer-suave/50 focus:border-cityzer-verde disabled:opacity-60"
            />

            <button
              type="button"
              disabled={carregando}
              onClick={() =>
                setMostrarSenha((anterior) => !anterior)
              }
              aria-label={
                mostrarSenha
                  ? "Ocultar senha"
                  : "Mostrar senha"
              }
              aria-pressed={mostrarSenha}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center text-cityzer-suave hover:text-cityzer-verde disabled:opacity-50"
            >
              {mostrarSenha ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>
        </div>

        {/* Mensagem de erro */}
        {erro && (
          <p
            role="alert"
            className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-xs leading-relaxed text-red-300"
          >
            {erro}
          </p>
        )}

        {/* Entrar */}
        <button
          type="submit"
          disabled={carregando}
          className="mt-2 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cityzer-verde px-4 font-semibold text-cityzer-fundo transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {carregando ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
              />
              Entrando...
            </>
          ) : (
            <>
              Entrar
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      {/* Cadastro */}
      <div className="mt-8 text-center">
        <p className="text-sm text-cityzer-suave">
          Ainda não possui uma conta?
        </p>

        <button
          type="button"
          disabled={carregando}
          onClick={onCriarConta}
          className="mt-2 cursor-pointer text-sm font-semibold text-cityzer-verde hover:underline disabled:opacity-50"
        >
          Criar conta
        </button>
      </div>
    </section>
  );
}

export default TelaLogin;
