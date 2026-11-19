import { SlidersHorizontal } from "lucide-react";

import {
  CATEGORIAS_OCORRENCIAS,
} from "../../dados/ocorrenciasDemonstracao";

function FiltrosOcorrencias({
  categoriaAtiva,
  onAlterarCategoria,
  ocorrencias,
  desabilitado = false,
}) {
  const filtros = [
    {
      id: "todos",
      nome: "Todos",
      cor: "#50E8B0",
    },
    ...CATEGORIAS_OCORRENCIAS,
  ];

  function contarOcorrencias(categoria) {
    if (categoria === "todos") {
      return ocorrencias.length;
    }

    return ocorrencias.filter(
      (ocorrencia) => ocorrencia.categoria === categoria
    ).length;
  }

  return (
    <section
      aria-label="Filtros de ocorrências"
      className="min-w-0 shrink-0 border-b border-white/10 bg-cityzer-superficie"
    >
      <div className="flex items-center justify-between gap-2 px-3 pb-2 pt-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={15}
            className="text-cityzer-verde"
          />
          <h2 className="text-xs font-semibold text-cityzer-texto">
            Filtrar ocorrências
          </h2>
        </div>

        <span className="text-[10px] text-cityzer-suave">
          Publicadas
        </span>
      </div>

      <div
        role="group"
        aria-label="Categorias de ocorrências"
        className="flex min-w-0 gap-2 overflow-x-auto px-3 pb-3"
      >
        {filtros.map((filtro) => {
          const ativo = categoriaAtiva === filtro.id;
          const quantidade = contarOcorrencias(filtro.id);

          return (
            <button
              key={filtro.id}
              type="button"
              disabled={desabilitado}
              onClick={() => onAlterarCategoria(filtro.id)}
              aria-pressed={ativo}
              className={`flex min-h-9 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                ativo
                  ? "border-cityzer-verde bg-cityzer-verde/15 text-cityzer-verde"
                  : "border-white/10 bg-cityzer-fundo/70 text-cityzer-suave hover:border-cityzer-verde/40"
              }`}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: filtro.cor }}
              />

              <span>{filtro.nome}</span>

              <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px]">
                {quantidade}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default FiltrosOcorrencias;
