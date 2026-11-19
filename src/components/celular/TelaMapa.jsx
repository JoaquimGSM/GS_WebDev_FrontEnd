import { useState } from "react";

import {
  MapContainer,
  TileLayer,
  ZoomControl,
  CircleMarker,
  useMapEvents,
} from "react-leaflet";

import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  LogOut,
  MapPin,
  Plus,
  RefreshCw,
  Users,
  X,
} from "lucide-react";

import { adicionarRelato } from "../../servicos/ocorrencias";
import useOcorrenciasMapa from "../../hooks/useOcorrenciasMapa";

import {
  CATEGORIAS_OCORRENCIAS,
} from "../../dados/ocorrenciasDemonstracao";

import FiltrosOcorrencias from "./FiltrosOcorrencias";
import PainelRelatos from "./PainelRelatos";

const CENTROS = {
  "São Paulo": [-23.5505, -46.6333],
  Cotia: [-23.6022, -46.919],
  Itapevi: [-23.5489, -46.9345],
  Barueri: [-23.5117, -46.876],
  Osasco: [-23.5327, -46.7917],
  Carapicuíba: [-23.5235, -46.8407],
  "Santana de Parnaíba": [-23.4445, -46.9178],
  Itaquaquecetuba: [-23.4862, -46.3497],
};

function CapturarLocalizacao({ ativo, onSelecionar }) {
  useMapEvents({
    click(evento) {
      if (!ativo) return;

      onSelecionar([
        evento.latlng.lat,
        evento.latlng.lng,
      ]);
    },
  });

  return null;
}

function TelaMapa({
  usuario,
  onVoltar,
  onSair,
  onRegistrar,
  onAbrirDetalhes,
  onAbrirMinhas,
  categoriaAtiva,
  onAlterarCategoria,
}) {
  const {
    cidade,
    publicadas,
    pendentes,
    carregando,
    erro,
    atualizarDados,
  } = useOcorrenciasMapa(usuario?.id);

  const [modoSelecao, setModoSelecao] = useState(false);
  const [localSelecionado, setLocalSelecionado] = useState(null);
  const [mostrarPainel, setMostrarPainel] = useState(false);
  const [processandoId, setProcessandoId] = useState(null);
  const [erroRelato, setErroRelato] = useState("");
  const [mensagemRelato, setMensagemRelato] = useState("");

  const ocorrenciasFiltradas =
    categoriaAtiva === "todos"
      ? publicadas
      : publicadas.filter(
          (ocorrencia) =>
            ocorrencia.categoria === categoriaAtiva
        );

  const centro = CENTROS[cidade] ?? CENTROS["São Paulo"];
  const botaoSair = Boolean(onSair) && !modoSelecao;

  function iniciarSelecao() {
    setModoSelecao(true);
    setLocalSelecionado(null);
  }

  function cancelarSelecao() {
    setModoSelecao(false);
    setLocalSelecionado(null);
  }

  function acaoCabecalho() {
    if (modoSelecao) {
      cancelarSelecao();
      return;
    }

    if (onSair) {
      onSair();
      return;
    }

    onVoltar();
  }

  function continuarRegistro() {
    if (!localSelecionado) return;

    onRegistrar(localSelecionado);
  }

  async function relatarOcorrencia(id) {
    if (!usuario || processandoId) return;

    setProcessandoId(id);
    setErroRelato("");
    setMensagemRelato("");

    try {
      const total = await adicionarRelato(id);

      setMensagemRelato(
        total >= 6
          ? "Sexto relato registrado! O alerta foi publicado."
          : `Relato registrado com sucesso: ${total}/6.`
      );

      atualizarDados();
    } catch (error) {
      setErroRelato(
        error.message || "Não foi possível registrar o relato."
      );
    } finally {
      setProcessandoId(null);
    }
  }

  function obterCor(categoriaId) {
    return (
      CATEGORIAS_OCORRENCIAS.find(
        (item) => item.id === categoriaId
      )?.cor ?? "#50E8B0"
    );
  }

  return (
    <section className="flex h-full min-h-0 flex-col bg-cityzer-fundo">
      <header className="relative z-10 flex shrink-0 items-center gap-3 border-b border-white/10 bg-cityzer-superficie px-4 py-3">
        <button
          type="button"
          onClick={acaoCabecalho}
          aria-label={
            modoSelecao
              ? "Cancelar seleção"
              : botaoSair
                ? "Sair da conta"
                : "Voltar"
          }
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-cityzer-texto hover:bg-white/10"
        >
          {botaoSair ? (
            <LogOut size={20} />
          ) : (
            <ArrowLeft size={20} />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="text-base font-bold text-cityzer-texto">
            {modoSelecao ? "Selecionar local" : "Mapa Cityzer"}
          </h1>

          <p className="flex items-center gap-1 text-xs text-cityzer-suave">
            <MapPin size={12} />
            {cidade}
          </p>
        </div>

        <span className="rounded-full border border-cityzer-verde/30 bg-cityzer-verde/10 px-2 py-1 text-[10px] font-semibold text-cityzer-verde">
          Ao vivo
        </span>
      </header>

      <FiltrosOcorrencias
        categoriaAtiva={categoriaAtiva}
        onAlterarCategoria={onAlterarCategoria}
        ocorrencias={publicadas}
        desabilitado={modoSelecao}
      />

      <div className="relative min-h-0 flex-1">
        <MapContainer
          key={cidade}
          center={centro}
          zoom={12}
          minZoom={9}
          maxZoom={19}
          scrollWheelZoom={false}
          zoomControl={false}
          className="h-full w-full"
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ZoomControl position="topright" />

          <CapturarLocalizacao
            ativo={modoSelecao}
            onSelecionar={setLocalSelecionado}
          />

          {!modoSelecao &&
            ocorrenciasFiltradas.map((ocorrencia) => (
              <CircleMarker
                key={ocorrencia.id}
                center={ocorrencia.posicao}
                radius={12}
                pathOptions={{
                  color: "#071119",
                  weight: 2,
                  fillColor: obterCor(ocorrencia.categoria),
                  fillOpacity: 0.95,
                  bubblingMouseEvents: false,
                }}
                eventHandlers={{
                  click: () => onAbrirDetalhes(ocorrencia),
                }}
              />
            ))}

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

        {modoSelecao && (
          <div className="pointer-events-none absolute bottom-6 left-3 right-3 z-500 rounded-xl border border-cityzer-verde/30 bg-cityzer-fundo/90 p-3 text-center shadow-lg">
            <p className="text-xs leading-relaxed text-cityzer-texto">
              {localSelecionado
                ? "Localização marcada. Toque em outro ponto para alterar."
                : "Toque no mapa para marcar onde aconteceu o problema."}
            </p>
          </div>
        )}

        {mostrarPainel && (
          <PainelRelatos
            ocorrencias={pendentes}
            carregando={carregando}
            processandoId={processandoId}
            erro={erroRelato || erro}
            mensagem={mensagemRelato}
            onRelatar={relatarOcorrencia}
            onFechar={() => setMostrarPainel(false)}
          />
        )}
      </div>

      <footer className="relative z-10 shrink-0 border-t border-white/10 bg-cityzer-superficie p-3">
        {!modoSelecao ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <p
                aria-live="polite"
                className="text-[11px] text-cityzer-suave"
              >
                {carregando
                  ? "Carregando alertas..."
                  : `${ocorrenciasFiltradas.length} alertas publicados`}
              </p>

              <button
                type="button"
                onClick={atualizarDados}
                disabled={carregando}
                aria-label="Atualizar ocorrências"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-cityzer-verde disabled:opacity-40"
              >
                <RefreshCw size={16} />
              </button>
            </div>

            {erro && (
              <p role="alert" className="text-[11px] text-red-300">
                {erro}
              </p>
            )}

            {usuario && (
              <button
                type="button"
                onClick={() => {
                  setErroRelato("");
                  setMensagemRelato("");
                  setMostrarPainel(true);
                }}
                className="flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-cityzer-ciano/30 bg-cityzer-ciano/10 text-xs font-semibold text-cityzer-ciano"
              >
                <Users size={16} />
                Aguardando relatos ({pendentes.length})
              </button>
            )}

            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
              <button
                type="button"
                onClick={onAbrirMinhas}
                className="flex min-h-12 items-center justify-center gap-1.5 rounded-xl border border-cityzer-verde/40 bg-cityzer-fundo px-3 text-xs font-semibold text-cityzer-verde"
              >
                <ClipboardList size={17} />
                Minhas
              </button>

              <button
                type="button"
                onClick={iniciarSelecao}
                className="flex min-h-12 min-w-0 items-center justify-center gap-1.5 rounded-xl bg-cityzer-verde px-2 text-xs font-semibold text-cityzer-fundo"
              >
                <Plus size={18} />
                Registrar ocorrência
              </button>
            </div>
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
                className="flex min-h-11 flex-1 items-center justify-center gap-1 rounded-xl border border-white/15 bg-cityzer-fundo text-xs font-semibold text-cityzer-texto"
              >
                <X size={15} />
                Cancelar
              </button>

              <button
                type="button"
                onClick={continuarRegistro}
                disabled={!localSelecionado}
                className="flex min-h-11 flex-1 items-center justify-center gap-1 rounded-xl bg-cityzer-verde text-xs font-semibold text-cityzer-fundo disabled:opacity-40"
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
