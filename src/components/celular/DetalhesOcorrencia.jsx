import {
  ArrowLeft,
  MapPin,
  ClipboardList,
  Info,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

import {
  CATEGORIAS_OCORRENCIAS,
} from "../../dados/ocorrenciasDemonstracao";

function DetalhesOcorrencia({ ocorrencia, onVoltar }) {
  const categoria = CATEGORIAS_OCORRENCIAS.find(
    (item) => item.id === ocorrencia.categoria
  );

  const [latitude, longitude] = ocorrencia.posicao;

  const corCategoria = categoria?.cor ?? "#50E8B0";

  return (
    <section className="flex min-h-full flex-col bg-cityzer-fundo px-5 pb-7 pt-4">

      {/* Navegação */}
      <button
        type="button"
        onClick={onVoltar}
        className="flex w-fit cursor-pointer items-center gap-2 text-sm text-cityzer-suave transition-colors hover:text-cityzer-verde"
      >
        <ArrowLeft size={18} />
        Voltar ao mapa
      </button>

      {/* Cabeçalho */}
      <div className="mb-6 mt-7">

        <div
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border"
          style={{
            borderColor: `${corCategoria}55`,
            backgroundColor: `${corCategoria}18`,
          }}
        >
          <MapPinned
            size={28}
            strokeWidth={1.6}
            style={{ color: corCategoria }}
          />
        </div>

        <span
          className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold"
          style={{
            color: corCategoria,
            borderColor: `${corCategoria}55`,
            backgroundColor: `${corCategoria}15`,
          }}
        >
          {categoria?.nome ?? "Ocorrência"}
        </span>

        <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-cityzer-texto">
          {ocorrencia.titulo}
        </h1>

        <p className="mt-2 text-sm text-cityzer-suave">
          Informações da ocorrência selecionada.
        </p>
      </div>

      {/* Status demonstrativo */}
      <div className="mb-5 flex items-start gap-3 rounded-2xl border border-cityzer-ciano/30 bg-cityzer-ciano/10 p-4">

        <Info
          size={20}
          className="mt-0.5 shrink-0 text-cityzer-ciano"
        />

        <div>
          <h2 className="text-sm font-semibold text-cityzer-texto">
            Ocorrência de demonstração
          </h2>

          <p className="mt-1 text-xs leading-relaxed text-cityzer-suave">
            Este registro é fictício e foi criado
            exclusivamente para testar a interface.
            Não representa um problema real na via.
          </p>
        </div>
      </div>

      {/* Descrição */}
      <div className="mb-4 rounded-2xl border border-white/10 bg-cityzer-superficie/90 p-4">

        <div className="mb-3 flex items-center gap-2">
          <ClipboardList
            size={18}
            className="text-cityzer-verde"
          />

          <h2 className="text-sm font-semibold text-cityzer-texto">
            Descrição do problema
          </h2>
        </div>

        <p className="text-sm leading-relaxed wrap-break-word text-cityzer-suave">
          {ocorrencia.descricao}
        </p>
      </div>

      {/* Localização */}
      <div className="mb-4 rounded-2xl border border-white/10 bg-cityzer-superficie/90 p-4">

        <div className="mb-3 flex items-center gap-2">
          <MapPin
            size={18}
            className="text-cityzer-verde"
          />

          <h2 className="text-sm font-semibold text-cityzer-texto">
            Localização
          </h2>
        </div>

        <p className="text-sm font-medium text-cityzer-texto">
          São Paulo, SP
        </p>

        <p className="mt-2 text-xs text-cityzer-suave">
          Coordenadas geográficas
        </p>

        <div className="mt-2 grid grid-cols-2 gap-2">

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

      {/* Validação colaborativa */}
      <div className="mb-6 rounded-2xl border border-cityzer-verde/20 bg-cityzer-verde/5 p-4">

        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck
            size={19}
            className="text-cityzer-verde"
          />

          <h2 className="text-sm font-semibold text-cityzer-texto">
            Validação colaborativa
          </h2>
        </div>

        <p className="text-xs leading-relaxed text-cityzer-suave">
          Na versão funcional, os usuários poderão
          confirmar se o problema continua presente
          na via.
        </p>

        <p className="mt-3 text-xs leading-relaxed text-cityzer-suave">
          O sistema de confirmação será desenvolvido
          em uma próxima etapa.
        </p>
      </div>

      {/* Voltar */}
      <button
        type="button"
        onClick={onVoltar}
        className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cityzer-verde px-4 font-semibold text-cityzer-fundo transition-colors hover:bg-emerald-300"
      >
        <ArrowLeft size={18} />
        Voltar ao mapa
      </button>

    </section>
  );
}

export default DetalhesOcorrencia;
