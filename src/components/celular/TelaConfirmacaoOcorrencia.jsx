import { useState } from "react";

import {
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  Clock3,
  MapPin,
  ShieldCheck,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import {
  CATEGORIAS_OCORRENCIAS,
} from "../../dados/ocorrenciasDemonstracao";

function TelaConfirmacaoOcorrencia({
  ocorrencia,
  respostaAnterior,
  onVoltar,
  onConfirmar,
}) {
  const [respostaSelecionada, setRespostaSelecionada] =
    useState(null);

  const categoria = CATEGORIAS_OCORRENCIAS.find(
    (item) => item.id === ocorrencia.categoria
  );

  const jaRespondeu = respostaAnterior !== null;

  function confirmarResposta() {
    if (!respostaSelecionada || jaRespondeu) return;

    onConfirmar(respostaSelecionada);
  }

  return (
    <section className="flex min-h-full flex-col bg-cityzer-fundo px-5 pb-7 pt-4">

      {/* Navegação */}
      <button
        type="button"
        onClick={onVoltar}
        className="flex w-fit cursor-pointer items-center gap-2 text-sm text-cityzer-suave hover:text-cityzer-verde"
      >
        <ArrowLeft size={18} />
        Voltar aos detalhes
      </button>

      {/* Cabeçalho */}
      <div className="mb-6 mt-7">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cityzer-verde/30 bg-cityzer-verde/10">
          <ShieldCheck
            size={29}
            className="text-cityzer-verde"
          />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-cityzer-texto">
          Verificar ocorrência
          <span className="text-cityzer-verde">.</span>
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-cityzer-suave">
          A colaboração da comunidade ajuda a manter
          as informações sobre as vias atualizadas.
        </p>
      </div>

      {/* Ocorrência selecionada */}
      <div className="mb-5 rounded-2xl border border-white/10 bg-cityzer-superficie p-4">
        <div className="mb-3 flex items-center gap-2">
          <MapPin
            size={17}
            className="text-cityzer-verde"
          />

          <span className="text-xs font-semibold text-cityzer-texto">
            Ocorrência selecionada
          </span>
        </div>

        <h2 className="text-base font-bold text-cityzer-texto">
          {ocorrencia.titulo}
        </h2>

        <p className="mt-2 text-xs text-cityzer-suave">
          {categoria?.nome ?? "Ocorrência"}
        </p>

        <p className="mt-3 text-xs leading-relaxed text-cityzer-suave">
          {ocorrencia.descricao}
        </p>
      </div>

      {/* Aviso */}
      <div className="mb-6 flex items-start gap-2 rounded-xl border border-cityzer-ciano/25 bg-cityzer-ciano/10 p-3">
        <Clock3
          size={17}
          className="mt-0.5 shrink-0 text-cityzer-ciano"
        />

        <p className="text-xs leading-relaxed text-cityzer-suave">
          Esta é uma demonstração. A verificação
          automática por tempo e localização ainda
          não está implementada.
        </p>
      </div>

      {jaRespondeu ? (
        /* Resposta já testada nesta sessão */
        <div
          role="status"
          className="flex flex-1 flex-col items-center justify-center text-center"
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-cityzer-verde/30 bg-cityzer-verde/10">
            <CheckCircle2
              size={34}
              className="text-cityzer-verde"
            />
          </div>

          <h2 className="text-xl font-bold text-cityzer-texto">
            Resposta de teste registrada!
          </h2>

          <p className="mt-4 text-sm text-cityzer-suave">
            Sua escolha nesta demonstração foi:
          </p>

          <p className="mt-3 text-lg font-bold text-cityzer-verde">
            {respostaAnterior === "sim"
              ? "Sim, continua"
              : "Não, foi resolvido"}
          </p>

          <p className="mt-5 text-xs leading-relaxed text-cityzer-suave">
            A resposta existe apenas enquanto
            esta página estiver aberta.
            Nenhum dado foi enviado ao servidor.
          </p>
        </div>
      ) : (
        /* Formulário de confirmação */
        <>
          <div className="mb-6">
            <h2 className="text-lg font-bold leading-snug text-cityzer-texto">
              O problema ainda continua no local?
            </h2>

            <p className="mt-2 text-xs leading-relaxed text-cityzer-suave">
              Selecione uma das opções abaixo.
            </p>
          </div>

          <div
            role="group"
            aria-label="Situação atual da ocorrência"
            className="space-y-3"
          >
            {/* Resposta SIM */}
            <button
              type="button"
              onClick={() => setRespostaSelecionada("sim")}
              aria-pressed={respostaSelecionada === "sim"}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
                respostaSelecionada === "sim"
                  ? "border-cityzer-verde bg-cityzer-verde/15"
                  : "border-white/15 bg-cityzer-superficie hover:border-cityzer-verde/40"
              }`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cityzer-verde/10">
                <ThumbsUp
                  size={21}
                  className="text-cityzer-verde"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-cityzer-texto">
                  Sim, continua
                </p>

                <p className="mt-1 text-xs leading-relaxed text-cityzer-suave">
                  O problema ainda está presente.
                </p>
              </div>

              <div
                aria-hidden="true"
                className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                  respostaSelecionada === "sim"
                    ? "border-cityzer-verde bg-cityzer-verde"
                    : "border-white/30"
                }`}
              />
            </button>

            {/* Resposta NÃO */}
            <button
              type="button"
              onClick={() => setRespostaSelecionada("nao")}
              aria-pressed={respostaSelecionada === "nao"}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
                respostaSelecionada === "nao"
                  ? "border-cityzer-verde bg-cityzer-verde/15"
                  : "border-white/15 bg-cityzer-superficie hover:border-cityzer-verde/40"
              }`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cityzer-verde/10">
                <ThumbsDown
                  size={21}
                  className="text-cityzer-verde"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-cityzer-texto">
                  Não, foi resolvido
                </p>

                <p className="mt-1 text-xs leading-relaxed text-cityzer-suave">
                  O problema não está mais presente.
                </p>
              </div>

              <div
                aria-hidden="true"
                className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                  respostaSelecionada === "nao"
                    ? "border-cityzer-verde bg-cityzer-verde"
                    : "border-white/30"
                }`}
              />
            </button>
          </div>

          {/* Informação sobre a regra futura */}
          <div className="mt-6 flex items-start gap-2 rounded-xl border border-white/10 p-3">
            <CircleAlert
              size={17}
              className="mt-0.5 shrink-0 text-cityzer-suave"
            />

            <p className="text-xs leading-relaxed text-cityzer-suave">
              Na versão funcional, três respostas
              negativas de usuários diferentes
              poderão retirar o alerta do mapa,
              conforme as regras de validação.
            </p>
          </div>

          {/* Confirmar */}
          <button
            type="button"
            onClick={confirmarResposta}
            disabled={!respostaSelecionada}
            className="mt-7 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cityzer-verde px-4 text-sm font-semibold text-cityzer-fundo transition-colors hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CheckCircle2 size={18} />
            Confirmar resposta de teste
          </button>
        </>
      )}

      {jaRespondeu && (
        <button
          type="button"
          onClick={onVoltar}
          className="mt-6 min-h-12 w-full cursor-pointer rounded-xl bg-cityzer-verde text-sm font-semibold text-cityzer-fundo"
        >
          Voltar aos detalhes
        </button>
      )}
    </section>
  );
}

export default TelaConfirmacaoOcorrencia;
