import { MapPinned } from "lucide-react";

function Aplicativo() {
  return (
    <div
      className="
        relative flex min-h-full
        flex-col items-center justify-center
        overflow-hidden
        bg-cityzer-fundo
        px-6 text-center
      "
    >
      {/* Iluminação decorativa */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          h-64 w-64
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-cityzer-verde/10
          blur-[75px]
        "
      />

      {/* Identidade do aplicativo */}
      <div className="relative z-10 flex flex-col items-center">
        <div
          className="
            mb-6 flex h-20 w-20
            items-center justify-center
            rounded-[25px]
            border border-cityzer-verde/30
            bg-cityzer-verde/10
            shadow-[0_0_40px_rgba(80,232,176,0.12)]
          "
        >
          <MapPinned
            size={40}
            strokeWidth={1.6}
            className="text-cityzer-verde"
          />
        </div>

        <h1
          className="
            text-4xl font-extrabold
            tracking-tight text-cityzer-texto
          "
        >
          City<span className="text-cityzer-verde">zer</span>
        </h1>

        <p className="mt-3 text-sm text-cityzer-suave">
          Sua cidade mais conectada.
        </p>
      </div>

      {/* Indicador temporário */}
      <p
        className="
          absolute bottom-8 left-0 right-0
          text-center text-[11px]
          tracking-wider text-cityzer-suave/70
        "
      >
        INTERFACE EM DESENVOLVIMENTO
      </p>
    </div>
  );
}

export default Aplicativo;
