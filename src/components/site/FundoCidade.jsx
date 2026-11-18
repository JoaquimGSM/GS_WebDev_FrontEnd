import ponteEstaiada from "../../assets/imagens/ponte-estaiada.png";

function FundoCidade() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Fotografia real da Ponte Estaiada */}
      <img
        src={ponteEstaiada}
        alt=""
        className="
          h-full w-full
          object-cover
          object-[63%_center]
          sm:object-[65%_center]
          xl:object-center
        "
      />

      {/* Contraste para o card e para a logo */}
      <div
        className="
          absolute inset-0
          bg-linear-to-r
          from-cityzer-fundo/80
          via-cityzer-fundo/35
          to-cityzer-fundo/10
        "
      />

      {/* Escurecimento das extremidades */}
      <div
        className="
          absolute inset-0
          bg-linear-to-t
          from-cityzer-fundo/55
          via-transparent
          to-cityzer-fundo/40
        "
      />
    </div>
  );
}

export default FundoCidade;
