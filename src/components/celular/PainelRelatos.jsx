import { ArrowLeft, MapPin, Users, LoaderCircle } from "lucide-react";

import {
  CATEGORIAS_OCORRENCIAS,
} from "../../dados/ocorrenciasDemonstracao";

function PainelRelatos({
  ocorrencias,
  carregando,
  processandoId,
  erro,
  mensagem,
  onRelatar,
  onFechar,
}) {
  return (
    <section className="absolute inset-0 z-1200 flex flex-col bg-cityzer-fundo">
      <header className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-cityzer-superficie px-4 py-3">
        <button
          type="button"
          onClick={onFechar}
          aria-label="Voltar ao mapa"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-cityzer-texto"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h2 className="text-sm font-bold text-cityzer-texto">
            Colaborar com relatos
          </h2>
          <p className="text-[11px] text-cityzer-suave">
            Ocorrências aguardando validação
          </p>
        </div>
      </header>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        <p className="text-xs leading-relaxed text-cityzer-suave">
          Encontrou um problema já relatado? Confirme que
          se trata da mesma ocorrência. Cada conta pode
          contribuir uma vez para cada registro.
        </p>

        {mensagem && (
          <p
            role="status"
            className="rounded-xl border border-cityzer-verde/30 bg-cityzer-verde/10 p-3 text-xs text-cityzer-verde"
          >
            {mensagem}
          </p>
        )}

        {erro && (
          <p
            role="alert"
            className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-xs text-red-300"
          >
            {erro}
          </p>
        )}

        {carregando && (
          <div className="flex items-center justify-center gap-2 py-8 text-xs text-cityzer-suave">
            <LoaderCircle size={18} className="animate-spin" />
            Atualizando relatos...
          </div>
        )}

        {!carregando && ocorrencias.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-cityzer-superficie p-5 text-center">
            <Users
              size={30}
              className="mx-auto text-cityzer-verde"
            />
            <p className="mt-3 text-sm font-semibold text-cityzer-texto">
              Nenhuma ocorrência pendente
            </p>
            <p className="mt-2 text-xs text-cityzer-suave">
              Quando alguém registrar um problema nesta
              cidade, ele poderá aparecer aqui.
            </p>
          </div>
        )}

        {!carregando &&
          ocorrencias.map((ocorrencia) => {
            const categoria = CATEGORIAS_OCORRENCIAS.find(
              (item) => item.id === ocorrencia.categoria
            );

            const cor = categoria?.cor ?? "#50E8B0";
            const processando = processandoId === ocorrencia.id;

            return (
              <article
                key={ocorrencia.id}
                className="rounded-2xl border border-white/10 bg-cityzer-superficie p-4"
              >
                <span
                  className="inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold"
                  style={{
                    color: cor,
                    borderColor: `${cor}55`,
                    backgroundColor: `${cor}15`,
                  }}
                >
                  {categoria?.nome ?? "Ocorrência"}
                </span>

                <p className="mt-3 wrap-break-word text-xs leading-relaxed text-cityzer-texto">
                  {ocorrencia.descricao}
                </p>

                {ocorrencia.referencia && (
                  <p className="mt-2 wrap-break-word text-xs text-cityzer-suave">
                    {ocorrencia.referencia}
                  </p>
                )}

                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-cityzer-suave">
                  <MapPin size={13} />
                  {ocorrencia.posicao[0].toFixed(5)},{" "}
                  {ocorrencia.posicao[1].toFixed(5)}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-semibold text-cityzer-verde">
                    <Users size={16} />
                    {ocorrencia.totalRelatos}/6 relatos
                  </span>

                  <span className="text-[10px] text-cityzer-suave">
                    Aguardando publicação
                  </span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cityzer-fundo">
                  <div
                    className="h-full rounded-full bg-cityzer-verde"
                    style={{
                      width: `${Math.min(
                        100,
                        (ocorrencia.totalRelatos / 6) * 100
                      )}%`,
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => onRelatar(ocorrencia.id)}
                  disabled={
                    ocorrencia.jaRelatei ||
                    Boolean(processandoId)
                  }
                  className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-cityzer-verde px-3 text-xs font-semibold text-cityzer-fundo disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {processando ? (
                    <>
                      <LoaderCircle
                        size={16}
                        className="animate-spin"
                      />
                      Registrando...
                    </>
                  ) : ocorrencia.jaRelatei ? (
                    "Você já relatou"
                  ) : (
                    "Também encontrei esse problema"
                  )}
                </button>
              </article>
            );
          })}
      </div>
    </section>
  );
}

export default PainelRelatos;
