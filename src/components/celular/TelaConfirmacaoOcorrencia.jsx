import { useEffect, useState } from "react";

import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  ShieldCheck,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import {
  consultarConfirmacao,
  confirmarOcorrencia,
} from "../../servicos/confirmacoes";

import {
  CATEGORIAS_OCORRENCIAS,
} from "../../dados/ocorrenciasDemonstracao";

function TelaConfirmacaoOcorrencia({
  ocorrencia,
  usuario,
  onVoltar,
  onVoltarAoMapa,
}) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [resposta, setResposta] = useState("");
  const [agora, setAgora] = useState(Date.now());

  const categoria = CATEGORIAS_OCORRENCIAS.find(
    (item) => item.id === ocorrencia.categoria
  );

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAgora(Date.now());
    }, 30000);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (!usuario?.id) {
      setCarregando(false);
      return;
    }

    let ativo = true;

    setCarregando(true);
    setErro("");

    consultarConfirmacao(ocorrencia.id)
      .then((resultado) => {
        if (ativo) setDados(resultado);
      })
      .catch((error) => {
        if (ativo) {
          setErro(
            error.message ||
              "Não foi possível carregar a verificação."
          );
        }
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [ocorrencia.id, usuario?.id]);

  const removida = dados?.status === "removida";
  const jaConfirmou = Boolean(dados?.minhaResposta);

  const prazo =
    dados?.revisaoDisponivelEm
      ? new Date(dados.revisaoDisponivelEm)
      : null;

  const prazoValido =
    prazo && !Number.isNaN(prazo.getTime());

  const liberada =
    dados?.status === "publicada" &&
    prazoValido &&
    agora >= prazo.getTime();

  const podeResponder =
    Boolean(usuario?.id) &&
    liberada &&
    !jaConfirmou &&
    !enviando;

  async function registrarResposta() {
    if (!podeResponder || !resposta) return;

    setEnviando(true);
    setErro("");
    setMensagem("");

    try {
      const resultado = await confirmarOcorrencia(
        ocorrencia.id,
        resposta
      );

      setDados(resultado);
      setResposta("");

      setMensagem(
        resultado.status === "removida"
          ? "A terceira confirmação negativa foi registrada. O alerta foi removido do mapa."
          : "Sua confirmação foi registrada com sucesso."
      );
    } catch (error) {
      setErro(
        error.message ||
          "Não foi possível registrar sua confirmação."
      );
    } finally {
      setEnviando(false);
    }
  }

  function voltar() {
    if (removida) {
      onVoltarAoMapa();
    } else {
      onVoltar();
    }
  }

  return (
    <section className="flex min-h-full flex-col bg-cityzer-fundo px-5 pb-7 pt-4">
      <button
        type="button"
        onClick={voltar}
        className="flex w-fit items-center gap-2 text-sm text-cityzer-suave hover:text-cityzer-verde"
      >
        <ArrowLeft size={18} />
        {removida ? "Voltar ao mapa" : "Voltar aos detalhes"}
      </button>

      <div className="mb-6 mt-7">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cityzer-verde/30 bg-cityzer-verde/10">
          <ShieldCheck
            size={29}
            className="text-cityzer-verde"
          />
        </div>

        <h1 className="text-2xl font-bold text-cityzer-texto">
          Verificar ocorrência
          <span className="text-cityzer-verde">.</span>
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-cityzer-suave">
          Confirme se o problema ainda está presente na via.
        </p>
      </div>

      <div className="mb-5 rounded-2xl border border-white/10 bg-cityzer-superficie p-4">
        <p className="text-xs font-semibold text-cityzer-verde">
          {categoria?.nome ?? "Ocorrência"}
        </p>

        <h2 className="mt-2 text-base font-bold text-cityzer-texto">
          {ocorrencia.titulo}
        </h2>

        <p className="mt-3 wrap-break-word text-xs leading-relaxed text-cityzer-suave">
          {ocorrencia.descricao}
        </p>
      </div>

      {carregando && (
        <div className="flex items-center justify-center gap-2 py-8 text-sm text-cityzer-suave">
          <LoaderCircle
            size={19}
            className="animate-spin text-cityzer-verde"
          />
          Consultando verificação...
        </div>
      )}

      {!usuario && (
        <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
          Entre na sua conta para confirmar ocorrências.
        </p>
      )}

      {erro && (
        <p
          role="alert"
          className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-xs leading-relaxed text-red-300"
        >
          {erro}
        </p>
      )}

      {mensagem && (
        <p
          role="status"
          className="mb-4 rounded-xl border border-cityzer-verde/30 bg-cityzer-verde/10 p-3 text-xs leading-relaxed text-cityzer-verde"
        >
          {mensagem}
        </p>
      )}

      {dados && (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-cityzer-superficie p-4 text-center">
              <ThumbsUp
                size={23}
                className="mx-auto text-cityzer-verde"
              />
              <p className="mt-3 text-2xl font-bold text-cityzer-texto">
                {dados.totalSim}
              </p>
              <p className="mt-1 text-xs text-cityzer-suave">
                Sim
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-cityzer-superficie p-4 text-center">
              <ThumbsDown
                size={23}
                className="mx-auto text-red-300"
              />
              <p className="mt-3 text-2xl font-bold text-cityzer-texto">
                {dados.totalNao}/3
              </p>
              <p className="mt-1 text-xs text-cityzer-suave">
                Não
              </p>
            </div>
          </div>

          {removida ? (
            <div className="rounded-2xl border border-cityzer-verde/30 bg-cityzer-verde/10 p-4 text-center">
              <CheckCircle2
                size={30}
                className="mx-auto text-cityzer-verde"
              />
              <h2 className="mt-3 text-lg font-bold text-cityzer-texto">
                Alerta removido
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-cityzer-suave">
                Três usuários diferentes informaram que
                o problema foi resolvido.
              </p>
            </div>
          ) : jaConfirmou ? (
            <div className="rounded-2xl border border-cityzer-verde/30 bg-cityzer-verde/10 p-4 text-center">
              <CheckCircle2
                size={30}
                className="mx-auto text-cityzer-verde"
              />
              <h2 className="mt-3 text-lg font-bold text-cityzer-texto">
                Você já confirmou
              </h2>
              <p className="mt-2 text-sm text-cityzer-suave">
                Sua resposta:{" "}
                <strong className="text-cityzer-texto">
                  {dados.minhaResposta === "sim"
                    ? "Sim, continua"
                    : "Não, foi resolvido"}
                </strong>
              </p>
            </div>
          ) : !prazoValido ? (
            <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4">
              <p className="text-sm font-semibold text-amber-200">
                Prazo de verificação não definido
              </p>
              <p className="mt-2 text-xs leading-relaxed text-cityzer-suave">
                Esta categoria ainda não possui um prazo
                configurado para receber confirmações.
              </p>
            </div>
          ) : !liberada ? (
            <div className="flex items-start gap-3 rounded-xl border border-cityzer-ciano/30 bg-cityzer-ciano/10 p-4">
              <Clock3
                size={20}
                className="shrink-0 text-cityzer-ciano"
              />
              <div>
                <p className="text-sm font-semibold text-cityzer-texto">
                  Aguardando prazo de verificação
                </p>
                <p className="mt-2 text-xs leading-relaxed text-cityzer-suave">
                  Disponível a partir de{" "}
                  {prazo.toLocaleString("pt-BR")}.
                </p>
              </div>
            </div>
          ) : (
            <>
              <h2 className="mb-4 text-lg font-bold text-cityzer-texto">
                O problema ainda continua no local?
              </h2>

              <div
                role="group"
                aria-label="Situação atual da ocorrência"
                className="space-y-3"
              >
                {[
                  {
                    valor: "sim",
                    titulo: "Sim, continua",
                    texto: "O problema ainda está presente.",
                    Icone: ThumbsUp,
                  },
                  {
                    valor: "nao",
                    titulo: "Não, foi resolvido",
                    texto: "O problema não está mais presente.",
                    Icone: ThumbsDown,
                  },
                ].map((opcao) => (
                  <button
                    key={opcao.valor}
                    type="button"
                    onClick={() => setResposta(opcao.valor)}
                    aria-pressed={resposta === opcao.valor}
                    disabled={enviando}
                    className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
                      resposta === opcao.valor
                        ? "border-cityzer-verde bg-cityzer-verde/15"
                        : "border-white/15 bg-cityzer-superficie"
                    }`}
                  >
                    <opcao.Icone
                      size={22}
                      className="shrink-0 text-cityzer-verde"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-cityzer-texto">
                        {opcao.titulo}
                      </p>
                      <p className="mt-1 text-xs text-cityzer-suave">
                        {opcao.texto}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                        resposta === opcao.valor
                          ? "border-cityzer-verde bg-cityzer-verde"
                          : "border-white/30"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={!resposta || enviando}
                onClick={registrarResposta}
                className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cityzer-verde px-4 text-sm font-semibold text-cityzer-fundo disabled:cursor-not-allowed disabled:opacity-40"
              >
                {enviando ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                    Registrando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Confirmar resposta
                  </>
                )}
              </button>
            </>
          )}
        </>
      )}

      <button
        type="button"
        onClick={voltar}
        className="mt-6 min-h-12 w-full rounded-xl border border-cityzer-verde/40 text-sm font-semibold text-cityzer-verde"
      >
        {removida ? "Voltar ao mapa" : "Voltar aos detalhes"}
      </button>
    </section>
  );
}

export default TelaConfirmacaoOcorrencia;
