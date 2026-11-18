import { Wifi, Signal, BatteryFull } from "lucide-react";

function Celular({ children }) {
  return (
    <div
      className="relative mx-auto w-full max-w-85"
      style={{ aspectRatio: "9 / 19.5" }}
    >
      {/* Brilho ao redor do smartphone */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -inset-3
          rounded-[4rem]
          bg-cityzer-ciano/10
          blur-2xl
        "
      />

      {/* Estrutura externa */}
      <div
        className="
          relative h-full w-full
          rounded-[3.3rem]
          border border-slate-400/60
          bg-linear-to-br
          from-slate-500
          via-slate-900
          to-black
          p-1.75
          shadow-[0_35px_90px_rgba(0,0,0,0.65)]
        "
      >
        {/* Tela do smartphone */}
        <div
          className="
            relative flex h-full flex-col
            overflow-hidden
            rounded-[2.9rem]
            border border-white/10
            bg-cityzer-fundo
          "
        >
          {/* Câmera frontal */}
          <div
            aria-hidden="true"
            className="
              absolute left-1/2 top-2.5
              z-30 h-5.75 w-21.25
              -translate-x-1/2
              rounded-full bg-black
              shadow-sm
            "
          >
            <span
              className="
                absolute right-3 top-2.25
                h-1.25 w-1.25
                rounded-full bg-slate-700
              "
            />
          </div>

          {/* Barra de status */}
          <div
            className="
              pointer-events-none relative z-20
              flex h-12 shrink-0
              items-start justify-between
              px-7 pt-4
              text-[11px] font-semibold text-white
            "
          >
            <span>9:41</span>

            <div className="flex items-center gap-1">
              <Signal size={12} />
              <Wifi size={12} />
              <BatteryFull size={15} />
            </div>
          </div>

          {/* Área funcional do aplicativo */}
          <div
            className="
              relative min-h-0 flex-1
              overflow-y-auto overscroll-contain
            "
          >
            {children}
          </div>

          {/* Indicador inferior */}
          <div
            className="
              pointer-events-none
              flex h-7 shrink-0
              items-center justify-center
              bg-cityzer-fundo
            "
          >
            <div className="h-1 w-28 rounded-full bg-white/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Celular;
