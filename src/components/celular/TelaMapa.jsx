import { useState } from "react";

import {
  MapContainer,
  TileLayer,
  ZoomControl,
  CircleMarker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import {
  ArrowLeft,
  MapPin,
  Plus,
  X,
  ArrowRight,
} from "lucide-react";

import FiltrosOcorrencias from "./FiltrosOcorrencias";

import {
  CATEGORIAS_OCORRENCIAS,
  OCORRENCIAS_DEMONSTRACAO,
} from "../../dados/ocorrenciasDemonstracao";

const CENTRO_SAO_PAULO = [-23.5505, -46.6333];

// Componente responsável pelos cliques no mapa
function CapturarLocalizacao({ ativo, onSelecionar }) {
  useMapEvents({
    click(evento) {
      if (!ativo) return;

      const { lat, lng } = evento.latlng;

      onSelecionar([lat, lng]);
    },
  });

  return null;
}

function TelaMapa({ onVoltar, onRegistrar }) {
  const [modoSelecao, setModoSelecao] = useState(false);

  const [localSelecionado, setLocalSelecionado] =
    useState(null);

  const [categoriaAtiva, setCategoriaAtiva] =
    useState("todos");

  // Filtragem das ocorrências demonstrativas
  const ocorrenciasFiltradas =
    categoriaAtiva === "todos"
      ? OCORRENCIAS_DEMONSTRACAO
      : OCORRENCIAS_DEMONSTRACAO.filter(
          (ocorrencia) =>
            ocorrencia.categoria === categoriaAtiva
        );

  function iniciarSelecao() {
    setLocalSelecionado(null);
    setModoSelecao(true);
  }

  function cancelarSelecao() {
    setModoSelecao(false);
    setLocalSelecionado(null);
  }

  function voltar() {
    if (modoSelecao) {
      cancelarSelecao();
      return;
    }

    onVoltar();
  }

  function continuarRegistro() {
    if (!localSelecionado) return;

    onRegistrar(localSelecionado);
  }

  function obterCategoria(id) {
    return CATEGORIAS_OCORRENCIAS.find(
      (categoria) => categoria.id === id
    );
  }

  return (
    <section className="flex h-full min-h-0 flex-col bg-cityzer-fundo">

      {/* Cabeçalho */}
      <header className="relative z-10 flex shrink-0 items-center gap-3 border-b border-white/10 bg-cityzer-superficie px-4 py-3">

        <button
          type="button"
          onClick={voltar}
          aria-label="Voltar"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-cityzer-texto transition-colors hover:bg-white/10"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="text-base font-bold text-cityzer-texto">
            {modoSelecao
              ? "Selecionar local"
              : "Mapa Cityzer"}
          </h1>

          <p className="flex items-center gap-1 text-xs text-cityzer-suave">
            <MapPin size={12} />
            São Paulo, SP
          </p>
        </div>

        <span className="rounded-full border border-cityzer-verde/30 bg-cityzer-verde/10 px-2 py-1 text-[10px] font-semibold text-cityzer-verde">
          Prévia
        </span>
      </header>

      {/* Filtros */}
      <FiltrosOcorrencias
        categoriaAtiva={categoriaAtiva}
        onAlterarCategoria={setCategoriaAtiva}
        ocorrencias={OCORRENCIAS_DEMONSTRACAO}
        desabilitado={modoSelecao}
      />

      {/* Mapa */}
      <div className="relative min-h-0 flex-1">

        <MapContainer
          center={CENTRO_SAO_PAULO}
          zoom={12}
          minZoom={9}
          maxZoom={19}
          scrollWheelZoom={false}
          zoomControl={false}
          className="h-full w-full"
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ZoomControl position="topright" />

          {/* Captura do ponto de registro */}
          <CapturarLocalizacao
            ativo={modoSelecao}
            onSelecionar={setLocalSelecionado}
          />

          {/* Ocorrências simuladas */}
          {!modoSelecao &&
            ocorrenciasFiltradas.map((ocorrencia) => {
              const categoria = obterCategoria(
                ocorrencia.categoria
              );

              return (
                <CircleMarker
                  key={ocorrencia.id}
                  center={ocorrencia.posicao}
                  radius={9}
                  pathOptions={{
                    color: "#071119",
                    weight: 2,
                    fillColor: categoria?.cor ?? "#50E8B0",
                    fillOpacity: 0.95,
                    bubblingMouseEvents: false,
                  }}
                >
                  <Popup>
                    <div className="min-w-40 text-slate-900">
                      <strong>
                        {ocorrencia.titulo}
                      </strong>

                      <p className="my-2 text-xs">
                        {ocorrencia.descricao}
                      </p>

                      <small className="font-semibold text-slate-600">
                        Ocorrência fictícia — demonstração
                      </small>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}

          {/* Marcador da localização escolhida */}
          {modoSelecao && localSelecionado && (
            <CircleMarker
              center={localSelecionado}
              radius={10}
              pathOptions={{
                color: "#071119",
                weight: 3,
                fillColor: "#50E8B0",
                fillOpacity: 1,
                bubblingMouseEvents: false,
              }}
            />
          )}
        </MapContainer>

        {/* Mensagem durante seleção */}
        {modoSelecao && (
          <div className="pointer-events-none absolute bottom-6 left-3 right-3 z-500 rounded-xl border border-cityzer-verde/30 bg-cityzer-fundo/90 p-3 text-center shadow-lg">

            <p className="text-xs leading-relaxed text-cityzer-texto">
              {localSelecionado
                ? "Localização marcada. Toque em outro ponto para alterar."
                : "Toque no mapa para marcar onde aconteceu o problema."}
            </p>
          </div>
        )}
      </div>

      {/* Rodapé */}
      <footer className="relative z-10 shrink-0 border-t border-white/10 bg-cityzer-superficie p-3">

        {!modoSelecao ? (
          <div className="space-y-2">

            {/* Quantidade de ocorrências filtradas */}
            <p
              aria-live="polite"
              className="text-center text-[11px] text-cityzer-suave"
            >
              {ocorrenciasFiltradas.length}{" "}
              {ocorrenciasFiltradas.length === 1
                ? "ocorrência fictícia exibida"
                : "ocorrências fictícias exibidas"}
            </p>

            <button
              type="button"
              onClick={iniciarSelecao}
              className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cityzer-verde font-semibold text-cityzer-fundo transition-colors hover:bg-emerald-300"
            >
              <Plus size={19} />
              Registrar ocorrência
            </button>

          </div>
        ) : (
          <div className="space-y-3">

            <p className="text-center text-[11px] text-cityzer-suave">
              {localSelecionado
                ? `Lat: ${localSelecionado[0].toFixed(5)} | Long: ${localSelecionado[1].toFixed(5)}`
                : "Nenhum local selecionado"}
            </p>

            <div className="flex gap-2">

              <button
                type="button"
                onClick={cancelarSelecao}
                className="flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-1 rounded-xl border border-white/15 bg-cityzer-fundo text-xs font-semibold text-cityzer-texto"
              >
                <X size={15} />
                Cancelar
              </button>

              <button
                type="button"
                onClick={continuarRegistro}
                disabled={!localSelecionado}
                className="flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-1 rounded-xl bg-cityzer-verde text-xs font-semibold text-cityzer-fundo disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continuar
                <ArrowRight size={15} />
              </button>

            </div>
          </div>
        )}
      </footer>
    </section>
  );
}

export default TelaMapa;
