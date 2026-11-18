import { ArrowRight, MapPinned, UserPlus } from "lucide-react";

function TelaBoasVindas({ onEntrar, onCriarConta }) {
  return (
    <section className="relative flex min-h-full flex-col overflow-hidden bg-cityzer-fundo px-6 pb-8 pt-8 text-center">

      {/* Iluminação decorativa */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-cityzer-verde/10 blur-[75px]"
      />

      {/* Identidade central */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">

        <div className="mb-7 flex h-22 w-22 items-center justify-center rounded-[28px] border border-cityzer-verde/30 bg-cityzer-verde/10 shadow-[0_0_45px_rgba(80,232,176,0.12)]">
          <MapPinned
            size={44}
            strokeWidth={1.5}
            className="text-cityzer-verde"
          />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-cityzer-texto">
          City<span className="text-cityzer-verde">zer</span>
        </h1>

        <div className="mt-7 h-px w-12 bg-cityzer-verde/50" />

        <h2 className="mt-7 text-xl font-semibold leading-snug text-cityzer-texto">
          Sua cidade.
          <br />
          Mais conectada.
        </h2>

        <p className="mt-4 max-w-65 text-sm leading-relaxed text-cityzer-suave">
          Compartilhe ocorrências nas ruas e acompanhe
          informações validadas pela comunidade.
        </p>
      </div>

      {/* Ações de acesso */}
      <div className="relative z-10 flex w-full flex-col gap-3">

        <button
          type="button"
          onClick={onEntrar}
          className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-cityzer-verde px-4 font-semibold text-cityzer-fundo transition-colors hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cityzer-ciano"
        >
          Entrar
          <ArrowRight size={18} />
        </button>

        <button
          type="button"
          onClick={onCriarConta}
          className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-cityzer-verde/40 bg-cityzer-superficie/70 px-4 font-semibold text-cityzer-texto transition-colors hover:bg-cityzer-verde/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cityzer-ciano"
        >
          <UserPlus size={18} />
          Criar conta
        </button>

      </div>
    </section>
  );
}

export default TelaBoasVindas;
