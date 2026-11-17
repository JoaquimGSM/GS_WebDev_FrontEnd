import ponteEstaiada from "../../assets/imagens/ponte-estaiada.png";

function FundoCidade() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Fotografia de São Paulo */}
      <img
        src={ponteEstaiada}
        alt=""
        className="h-full w-full object-cover object-[65%_center] md:object-center"
      />

      {/* Escurecimento para melhorar a leitura */}
      <div className="absolute inset-0 bg-gradient-to-r from-cityzer-fundo/75 via-cityzer-fundo/30 to-cityzer-fundo/15" />

      {/* Degradê superior e inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-cityzer-fundo/50 via-transparent to-cityzer-fundo/40" />
    </div>
  );
}

export default FundoCidade;
