import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { ArrowLeft, MapPin } from "lucide-react";

// Coordenadas centrais de São Paulo
const CENTRO_SAO_PAULO = [-23.5505, -46.6333];

function TelaMapa({ onVoltar }) {
  return (
    <section className="flex h-full min-h-0 flex-col bg-cityzer-fundo">

      {/* Cabeçalho */}
      <header className="relative z-10 flex shrink-0 items-center gap-3 border-b border-white/10 bg-cityzer-superficie px-4 py-3">

        <button
          type="button"
          onClick={onVoltar}
          aria-label="Voltar"
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl text-cityzer-texto transition-colors hover:bg-white/10"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="text-base font-bold text-cityzer-texto">
            Mapa Cityzer
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

      {/* Mapa interativo */}
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
        </MapContainer>

      </div>

      {/* Rodapé */}
      <footer className="relative z-10 shrink-0 border-t border-white/10 bg-cityzer-superficie px-4 py-3">

        <p className="text-center text-[11px] leading-relaxed text-cityzer-suave">
          Explore o mapa. Os alertas colaborativos
          serão adicionados nas próximas etapas.
        </p>

      </footer>

    </section>
  );
}

export default TelaMapa;
