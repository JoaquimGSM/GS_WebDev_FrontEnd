import {
  ArrowLeft,
  MapPin,
  ClipboardList,
  MapPinned,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

import {
  CATEGORIAS_OCORRENCIAS,
} from "../../dados/ocorrenciasDemonstracao";

function DetalhesOcorrencia({
  ocorrencia,
  respostaDemonstracao,
  onVoltar,
  onAbrirConfirmacao,
}) {
  const categoria = CATEGORIAS_OCORRENCIAS.find(
    (item) => item.id === ocorrencia.categoria
  );

  const [latitude, longitude] = ocorrencia.posicao;
  const cor = categoria?.cor ?? "#50E8B0";
  const jaRespondeu = respostaDemonstracao !== null;

  return (
    <section className="flex min-h-full flex-col bg-cityzer-fundo px-5 pb-7 pt-4">
      <button
        type="button"
        onClick={onVoltar}
        className="flex w-fit items-center gap-2 text-sm text-cityzer-suave hover:text-cityzer-verde"
      >
        <ArrowLeft size={18} />
        Voltar ao mapa
      </button>

      <div className="mb-6 mt-7">
        <div
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border"
          style={{
            borderColor: `${cor}55`,
            backgroundColor: `${cor}18`,
          }}
        >
          <MapPinned
            size={28}
            style={{ color: cor }}
          />
        </div>

        <span
          className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold"
          style={{
            color: cor,
            borderColor: `${cor}55`,
            backgroundColor: `${cor}15`,
          }}
        >
          {categoria?.nome ?? "Ocorrência"}
        </span>

        <h1 className="mt-4 text-2xl font-bold leading-tight text-cityzer-texto">
          {ocorrencia.titulo}
        </h1>

        <p className="mt-2 text-sm text-cityzer-suave">
          Ocorrência registrada em {ocorrencia.cidade}.
        </p>
      </div>

      <div className="mb-4 flex items-start gap-3 rounded-2xl border border-cityzer-verde/30 bg-cityzer-verde/10 p-4">
        <CheckCircle2
          size={20}
          className="mt-0.5 shrink-0 text-cityzer-verde"
        />

        <div>
          <h2 className="text-sm font-semibold text-cityzer-texto">
            Alerta publicado
          </h2>

          <p className="mt-1 text-xs leading-relaxed text-cityzer-suave">
            Esta ocorrência atingiu o mínimo de
            seis relatos distintos para aparecer
            no mapa da comunidade.
          </p>
        </div>
      </div>

      <div className="mb-4 rounded-2xl border border-white/10 bg-cityzer-superficie p-4">
        <div className="mb-3 flex items-center gap-2">
          <ClipboardList
            size={18}
            className="text-cityzer-verde"
          />

          <h2 className="text-sm font-semibold text-cityzer-texto">
            Descrição
          </h2>
        </div>

        <p className="wrap-break-word text-sm leading-relaxed text-cityzer-suave">
          {ocorrencia.descricao}
        </p>

        {ocorrencia.referencia && (
          <p className="mt-3 wrap-break-word text-xs text-cityzer-texto">
            Referência: {ocorrencia.referencia}
          </p>
        )}
      </div>

      <div className="mb-4 rounded-2xl border border-white/10 bg-cityzer-superficie p-4">
        <div className="mb-3 flex items-center gap-2">
          <MapPin
            size={18}
            className="text-cityzer-verde"
          />

          <h2 className="text-sm font-semibold text-cityzer-texto">
            Localização
          </h2>
        </div>

        <p className="text-sm text-cityzer-texto">
          {ocorrencia.cidade}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="min-w-0 rounded-xl bg-cityzer-fundo p-3">
            <p className="text-[11px] text-cityzer-suave">
              Latitude
            </p>
            <p className="mt-1 text-xs font-semibold text-cityzer-texto">
              {latitude.toFixed(5)}
            </p>
          </div>

          <div className="min-w-0 rounded-xl bg-cityzer-fundo p-3">
            <p className="text-[11px] text-cityzer-suave">
              Longitude
            </p>
            <p className="mt-1 text-xs font-semibold text-cityzer-texto">
              {longitude.toFixed(5)}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-cityzer-verde/20 bg-cityzer-verde/5 p-4">
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck
            size={19}
            className="text-cityzer-verde"
          />

          <h2 className="text-sm font-semibold text-cityzer-texto">
            Verificação colaborativa
          </h2>
        </div>

        <p className="text-xs leading-relaxed text-cityzer-suave">
          A verificação de permanência ainda está em
          modo de demonstração. As respostas não
          alteram o status real desta ocorrência.
        </p>

        {jaRespondeu && (
          <p className="mt-3 text-xs text-cityzer-verde">
            Sua resposta de teste:{" "}
            {respostaDemonstracao === "sim"
              ? "Sim, continua"
              : "Não, foi resolvido"}
          </p>
        )}

        <button
          type="button"
          onClick={onAbrirConfirmacao}
          className="mt-4 flex min-h-11 w-full items-center justify-between rounded-xl border border-cityzer-verde/40 bg-cityzer-fundo px-3 text-xs font-semibold text-cityzer-verde"
        >
          {jaRespondeu
            ? "Ver resposta de teste"
            : "Verificar ocorrência (prévia)"}
          <ChevronRight size={18} />
        </button>
      </div>

      <button
        type="button"
        onClick={onVoltar}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cityzer-verde font-semibold text-cityzer-fundo"
      >
        <ArrowLeft size={18} />
        Voltar ao mapa
      </button>
    </section>
  );
}

export default DetalhesOcorrencia;
