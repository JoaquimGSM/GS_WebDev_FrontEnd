import { useState } from "react";

import {
  ArrowLeft,
  ClipboardList,
  MapPin,
  Pencil,
  Trash2,
  Save,
  X,
  AlertTriangle,
} from "lucide-react";

import {
  CATEGORIAS_OCORRENCIAS,
} from "../../dados/ocorrenciasDemonstracao";

function TelaMinhasOcorrencias({
  ocorrencias,
  onVoltar,
  onEditar,
  onExcluir,
}) {
  const [edicao, setEdicao] = useState(null);
  const [exclusaoPendente, setExclusaoPendente] =
    useState(null);
  const [erro, setErro] = useState("");

  function iniciarEdicao(ocorrencia) {
    setEdicao({
      id: ocorrencia.id,
      categoria: ocorrencia.categoria,
      referencia: ocorrencia.referencia,
      descricao: ocorrencia.descricao,
    });

    setExclusaoPendente(null);
    setErro("");
  }

  function cancelarEdicao() {
    setEdicao(null);
    setErro("");
  }

  function alterarCampo(campo, valor) {
    setEdicao((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));

    setErro("");
  }

  function salvarEdicao(evento) {
    evento.preventDefault();

    if (!edicao) return;

    const categoriaValida =
      CATEGORIAS_OCORRENCIAS.some(
        (item) => item.id === edicao.categoria
      );

    if (!categoriaValida) {
      setErro("Selecione uma categoria válida.");
      return;
    }

    if (edicao.descricao.trim().length < 10) {
      setErro(
        "A descrição deve ter pelo menos 10 caracteres."
      );
      return;
    }

    onEditar(edicao.id, {
      categoria: edicao.categoria,
      referencia: edicao.referencia.trim(),
      descricao: edicao.descricao.trim(),
    });

    cancelarEdicao();
  }

  function solicitarExclusao(id) {
    setExclusaoPendente(id);
    setEdicao(null);
    setErro("");
  }

  function confirmarExclusao(id) {
    onExcluir(id);
    setExclusaoPendente(null);
  }

  function obterCategoria(id) {
    return CATEGORIAS_OCORRENCIAS.find(
      (categoria) => categoria.id === id
    );
  }

  return (
    <section className="flex min-h-full flex-col bg-cityzer-fundo px-4 pb-7 pt-4">

      {/* Navegação */}
      <button
        type="button"
        onClick={onVoltar}
        className="flex w-fit cursor-pointer items-center gap-2 text-sm text-cityzer-suave hover:text-cityzer-verde"
      >
        <ArrowLeft size={18} />
        Voltar ao mapa
      </button>

      {/* Cabeçalho */}
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

        <p className="mt-2 text-sm leading-relaxed text-cityzer-suave">
          Consulte e gerencie seus registros.
        </p>
      </div>

      {/* Aviso sobre dados fictícios */}
      <div className="mb-5 rounded-xl border border-cityzer-ciano/30 bg-cityzer-ciano/10 p-3">
        <div className="flex items-start gap-2">
          <AlertTriangle
            size={17}
            className="mt-0.5 shrink-0 text-cityzer-ciano"
          />

          <p className="text-xs leading-relaxed text-cityzer-suave">
            Estes registros são fictícios.
            As alterações são temporárias e não
            serão enviadas ao banco de dados.
          </p>
        </div>
      </div>

      {/* Contador */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-cityzer-texto">
          Seus registros de demonstração
        </h2>

        <span className="rounded-lg bg-cityzer-superficie px-2.5 py-1 text-xs font-semibold text-cityzer-verde">
          {ocorrencias.length}
        </span>
      </div>

      {/* Estado vazio */}
      {ocorrencias.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-cityzer-superficie/80 p-6 text-center">
          <ClipboardList
            size={35}
            className="mx-auto text-cityzer-suave"
          />

          <h3 className="mt-4 text-sm font-semibold text-cityzer-texto">
            Nenhum registro encontrado
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-cityzer-suave">
            Não existem mais ocorrências nesta
            demonstração.
          </p>

          <button
            type="button"
            onClick={onVoltar}
            className="mt-5 cursor-pointer text-sm font-semibold text-cityzer-verde"
          >
            Voltar ao mapa
          </button>
        </div>
      )}

      {/* Lista de ocorrências */}
      <div className="flex flex-col gap-4">
        {ocorrencias.map((ocorrencia) => {
          const categoria = obterCategoria(
            ocorrencia.categoria
          );

          const cor = categoria?.cor ?? "#50E8B0";
          const editando = edicao?.id === ocorrencia.id;
          const confirmando =
            exclusaoPendente === ocorrencia.id;

          return (
            <article
              key={ocorrencia.id}
              className="rounded-2xl border border-white/10 bg-cityzer-superficie/90 p-4"
            >
              {/* Categoria e status */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
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
                  Fictícia
                </span>
              </div>

              {/* Localização */}
              <div className="mb-3 flex items-start gap-2">
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0 text-cityzer-verde"
                />

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-cityzer-texto">
                    São Paulo, SP
                  </p>

                  <p className="mt-1 break-all text-[11px] text-cityzer-suave">
                    {ocorrencia.posicao[0].toFixed(5)},{" "}
                    {ocorrencia.posicao[1].toFixed(5)}
                  </p>
                </div>
              </div>

              {/* Formulário de edição */}
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
                      onChange={(evento) =>
                        alterarCampo(
                          "categoria",
                          evento.target.value
                        )
                      }
                      className="min-h-11 w-full rounded-xl border border-white/15 bg-cityzer-fundo px-3 text-xs text-cityzer-texto outline-none focus:border-cityzer-verde"
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
                      onChange={(evento) =>
                        alterarCampo(
                          "referencia",
                          evento.target.value
                        )
                      }
                      className="min-h-11 w-full rounded-xl border border-white/15 bg-cityzer-fundo px-3 text-xs text-cityzer-texto outline-none focus:border-cityzer-verde"
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
                      onChange={(evento) =>
                        alterarCampo(
                          "descricao",
                          evento.target.value
                        )
                      }
                      className="w-full resize-none rounded-xl border border-white/15 bg-cityzer-fundo p-3 text-xs leading-relaxed text-cityzer-texto outline-none focus:border-cityzer-verde"
                    />
                  </div>

                  {erro && (
                    <p
                      role="alert"
                      className="rounded-lg border border-red-400/30 bg-red-500/10 p-2 text-xs text-red-300"
                    >
                      {erro}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={cancelarEdicao}
                      className="flex min-h-10 cursor-pointer items-center justify-center gap-1 rounded-xl border border-white/15 text-xs text-cityzer-texto"
                    >
                      <X size={15} />
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      className="flex min-h-10 cursor-pointer items-center justify-center gap-1 rounded-xl bg-cityzer-verde text-xs font-semibold text-cityzer-fundo"
                    >
                      <Save size={15} />
                      Salvar
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {/* Informações */}
                  {ocorrencia.referencia && (
                    <p className="mb-2 wrap-break-word text-xs font-medium text-cityzer-texto">
                      {ocorrencia.referencia}
                    </p>
                  )}

                  <p className="wrap-break-word text-xs leading-relaxed text-cityzer-suave">
                    {ocorrencia.descricao}
                  </p>

                  {/* Confirmação de exclusão */}
                  {confirmando ? (
                    <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3">
                      <p className="text-xs leading-relaxed text-red-200">
                        Excluir este registro fictício?
                      </p>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setExclusaoPendente(null)
                          }
                          className="min-h-10 cursor-pointer rounded-lg border border-white/20 text-xs text-cityzer-texto"
                        >
                          Cancelar
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            confirmarExclusao(ocorrencia.id)
                          }
                          className="min-h-10 cursor-pointer rounded-lg bg-red-500 text-xs font-semibold text-white"
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
                        className="flex min-h-10 cursor-pointer items-center justify-center gap-1 rounded-xl border border-cityzer-verde/30 bg-cityzer-verde/5 text-xs font-semibold text-cityzer-verde"
                      >
                        <Pencil size={15} />
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          solicitarExclusao(ocorrencia.id)
                        }
                        className="flex min-h-10 cursor-pointer items-center justify-center gap-1 rounded-xl border border-red-400/30 bg-red-500/5 text-xs font-semibold text-red-300"
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
    </section>
  );
}

export default TelaMinhasOcorrencias;
