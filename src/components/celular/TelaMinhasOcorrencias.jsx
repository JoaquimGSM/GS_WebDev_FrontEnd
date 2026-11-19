import { useState } from "react";

import {
  ArrowLeft,
  ClipboardList,
  MapPin,
  Pencil,
  Trash2,
  Save,
  X,
  LoaderCircle,
} from "lucide-react";

import {
  CATEGORIAS_OCORRENCIAS,
} from "../../dados/ocorrenciasDemonstracao";

const STATUS = {
  pendente: "Pendente",
  publicada: "Publicada",
  removida: "Removida",
};

function TelaMinhasOcorrencias({
  usuario,
  ocorrencias,
  carregando,
  erroCarregamento,
  onVoltar,
  onEditar,
  onExcluir,
}) {
  const [edicao, setEdicao] = useState(null);
  const [exclusaoPendente, setExclusaoPendente] =
    useState(null);

  const [processando, setProcessando] = useState(false);
  const [erroAcao, setErroAcao] = useState("");
  const [aviso, setAviso] = useState("");

  function iniciarEdicao(ocorrencia) {
    setEdicao({
      id: ocorrencia.id,
      categoria: ocorrencia.categoria,
      referencia: ocorrencia.referencia ?? "",
      descricao: ocorrencia.descricao,
    });

    setExclusaoPendente(null);
    setErroAcao("");
    setAviso("");
  }

  function alterarCampo(campo, valor) {
    setEdicao((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));

    setErroAcao("");
  }

  async function salvarEdicao(evento) {
    evento.preventDefault();

    if (!edicao) return;

    if (
      !CATEGORIAS_OCORRENCIAS.some(
        (item) => item.id === edicao.categoria
      )
    ) {
      setErroAcao("Selecione uma categoria válida.");
      return;
    }

    if (edicao.descricao.trim().length < 10) {
      setErroAcao(
        "A descrição deve ter pelo menos 10 caracteres."
      );
      return;
    }

    setProcessando(true);
    setErroAcao("");

    try {
      await onEditar(edicao.id, {
        categoria: edicao.categoria,
        referencia: edicao.referencia.trim(),
        descricao: edicao.descricao.trim(),
      });

      setEdicao(null);
      setAviso("Ocorrência atualizada com sucesso.");
    } catch (error) {
      setErroAcao(
        error.message || "Erro ao atualizar ocorrência."
      );
    } finally {
      setProcessando(false);
    }
  }

  async function confirmarExclusao(id) {
    setProcessando(true);
    setErroAcao("");

    try {
      await onExcluir(id);
      setExclusaoPendente(null);
      setAviso("Ocorrência excluída com sucesso.");
    } catch (error) {
      setErroAcao(
        error.message || "Erro ao excluir ocorrência."
      );
    } finally {
      setProcessando(false);
    }
  }

  return (
    <section className="flex min-h-full flex-col bg-cityzer-fundo px-4 pb-7 pt-4">
      <button
        type="button"
        onClick={onVoltar}
        className="flex w-fit items-center gap-2 text-sm text-cityzer-suave hover:text-cityzer-verde"
      >
        <ArrowLeft size={18} />
        Voltar ao mapa
      </button>

      <div className="mb-5 mt-7">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cityzer-verde/30 bg-cityzer-verde/10">
          <ClipboardList
            size={25}
            className="text-cityzer-verde"
          />
        </div>

        <h1 className="text-2xl font-bold text-cityzer-texto">
          Minhas ocorrências
          <span className="text-cityzer-verde">.</span>
        </h1>

        <p className="mt-2 text-sm text-cityzer-suave">
          Consulte e gerencie seus registros.
        </p>
      </div>

      {!usuario && (
        <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
          Faça login para consultar suas ocorrências.
        </p>
      )}

      {usuario && carregando && (
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-cityzer-suave">
          <LoaderCircle
            size={20}
            className="animate-spin text-cityzer-verde"
          />
          Carregando ocorrências...
        </div>
      )}

      {erroCarregamento && (
        <p
          role="alert"
          className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-xs text-red-300"
        >
          {erroCarregamento}
        </p>
      )}

      {erroAcao && (
        <p
          role="alert"
          className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-xs text-red-300"
        >
          {erroAcao}
        </p>
      )}

      {aviso && (
        <p
          role="status"
          className="mb-4 rounded-xl border border-cityzer-verde/30 bg-cityzer-verde/10 p-3 text-xs text-cityzer-verde"
        >
          {aviso}
        </p>
      )}

      {usuario && !carregando && !erroCarregamento && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-cityzer-texto">
              Seus registros
            </h2>

            <span className="rounded-lg bg-cityzer-superficie px-3 py-1 text-xs font-semibold text-cityzer-verde">
              {ocorrencias.length}
            </span>
          </div>

          {ocorrencias.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-cityzer-superficie p-6 text-center">
              <ClipboardList
                size={35}
                className="mx-auto text-cityzer-suave"
              />

              <p className="mt-4 text-sm font-semibold text-cityzer-texto">
                Nenhuma ocorrência encontrada
              </p>

              <p className="mt-2 text-xs text-cityzer-suave">
                Seus registros aparecerão aqui.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {ocorrencias.map((ocorrencia) => {
              const categoria =
                CATEGORIAS_OCORRENCIAS.find(
                  (item) =>
                    item.id === ocorrencia.categoria
                );

              const cor = categoria?.cor ?? "#50E8B0";
              const editando =
                edicao?.id === ocorrencia.id;

              const confirmando =
                exclusaoPendente === ocorrencia.id;

              return (
                <article
                  key={ocorrencia.id}
                  className="rounded-2xl border border-white/10 bg-cityzer-superficie/90 p-4"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full border px-2.5 py-1 text-[11px] font-semibold"
                      style={{
                        color: cor,
                        borderColor: `${cor}55`,
                        backgroundColor: `${cor}15`,
                      }}
                    >
                      {categoria?.nome ?? "Ocorrência"}
                    </span>

                    <span className="rounded-full border border-white/15 px-2 py-1 text-[10px] text-cityzer-suave">
                      {STATUS[ocorrencia.status] ??
                        ocorrencia.status}
                    </span>
                  </div>

                  <div className="mb-3 flex items-start gap-2">
                    <MapPin
                      size={15}
                      className="mt-0.5 shrink-0 text-cityzer-verde"
                    />

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-cityzer-texto">
                        {ocorrencia.cidade}
                      </p>

                      <p className="mt-1 break-all text-[11px] text-cityzer-suave">
                        {ocorrencia.posicao[0].toFixed(5)},{" "}
                        {ocorrencia.posicao[1].toFixed(5)}
                      </p>
                    </div>
                  </div>

                  {editando ? (
                    <form
                      onSubmit={salvarEdicao}
                      className="space-y-4"
                    >
                      <div>
                        <label
                          htmlFor={`categoria-${ocorrencia.id}`}
                          className="mb-2 block text-xs font-medium text-cityzer-texto"
                        >
                          Categoria
                        </label>

                        <select
                          id={`categoria-${ocorrencia.id}`}
                          value={edicao.categoria}
                          disabled={processando}
                          onChange={(evento) =>
                            alterarCampo(
                              "categoria",
                              evento.target.value
                            )
                          }
                          className="min-h-11 w-full rounded-xl border border-white/15 bg-cityzer-fundo px-3 text-xs text-cityzer-texto"
                        >
                          {CATEGORIAS_OCORRENCIAS.map(
                            (item) => (
                              <option
                                key={item.id}
                                value={item.id}
                              >
                                {item.nome}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor={`referencia-${ocorrencia.id}`}
                          className="mb-2 block text-xs font-medium text-cityzer-texto"
                        >
                          Referência
                        </label>

                        <input
                          id={`referencia-${ocorrencia.id}`}
                          type="text"
                          maxLength={80}
                          value={edicao.referencia}
                          disabled={processando}
                          onChange={(evento) =>
                            alterarCampo(
                              "referencia",
                              evento.target.value
                            )
                          }
                          className="min-h-11 w-full rounded-xl border border-white/15 bg-cityzer-fundo px-3 text-xs text-cityzer-texto"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`descricao-${ocorrencia.id}`}
                          className="mb-2 block text-xs font-medium text-cityzer-texto"
                        >
                          Descrição
                        </label>

                        <textarea
                          id={`descricao-${ocorrencia.id}`}
                          rows={4}
                          maxLength={300}
                          value={edicao.descricao}
                          disabled={processando}
                          onChange={(evento) =>
                            alterarCampo(
                              "descricao",
                              evento.target.value
                            )
                          }
                          className="w-full resize-none rounded-xl border border-white/15 bg-cityzer-fundo p-3 text-xs leading-relaxed text-cityzer-texto"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          disabled={processando}
                          onClick={() => {
                            setEdicao(null);
                            setErroAcao("");
                          }}
                          className="flex min-h-10 items-center justify-center gap-1 rounded-xl border border-white/15 text-xs text-cityzer-texto"
                        >
                          <X size={15} />
                          Cancelar
                        </button>

                        <button
                          type="submit"
                          disabled={processando}
                          className="flex min-h-10 items-center justify-center gap-1 rounded-xl bg-cityzer-verde text-xs font-semibold text-cityzer-fundo disabled:opacity-50"
                        >
                          <Save size={15} />
                          Salvar
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      {ocorrencia.referencia && (
                        <p className="mb-2 wrap-break-word text-xs font-medium text-cityzer-texto">
                          {ocorrencia.referencia}
                        </p>
                      )}

                      <p className="wrap-break-word text-xs leading-relaxed text-cityzer-suave">
                        {ocorrencia.descricao}
                      </p>

                      {confirmando ? (
                        <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3">
                          <p className="text-xs text-red-200">
                            Excluir esta ocorrência
                            permanentemente?
                          </p>

                          <div className="mt-3 grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              disabled={processando}
                              onClick={() =>
                                setExclusaoPendente(null)
                              }
                              className="min-h-10 rounded-lg border border-white/20 text-xs text-cityzer-texto"
                            >
                              Cancelar
                            </button>

                            <button
                              type="button"
                              disabled={processando}
                              onClick={() =>
                                confirmarExclusao(
                                  ocorrencia.id
                                )
                              }
                              className="min-h-10 rounded-lg bg-red-500 text-xs font-semibold text-white disabled:opacity-50"
                            >
                              Confirmar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-5 grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              iniciarEdicao(ocorrencia)
                            }
                            className="flex min-h-10 items-center justify-center gap-1 rounded-xl border border-cityzer-verde/30 bg-cityzer-verde/5 text-xs font-semibold text-cityzer-verde"
                          >
                            <Pencil size={15} />
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setExclusaoPendente(
                                ocorrencia.id
                              );
                              setEdicao(null);
                              setErroAcao("");
                            }}
                            className="flex min-h-10 items-center justify-center gap-1 rounded-xl border border-red-400/30 bg-red-500/5 text-xs font-semibold text-red-300"
                          >
                            <Trash2 size={15} />
                            Excluir
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

export default TelaMinhasOcorrencias;
