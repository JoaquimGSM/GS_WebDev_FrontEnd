function CardApresentacao() {
  return (
    <section
      aria-labelledby="titulo-apresentacao"
      className="
        w-full max-w-[430px]
        rounded-[28px]
        border border-cityzer-verde/40
        bg-cityzer-superficie/85
        p-6 sm:p-8
        shadow-[0_24px_70px_rgba(0,0,0,0.45)]
        backdrop-blur-xl
      "
    >
      <h1
        id="titulo-apresentacao"
        className="
          mb-6
          text-3xl sm:text-4xl
          font-bold
          tracking-tight
          text-cityzer-texto
        "
      >
        Sobre o{" "}
        <span className="text-cityzer-verde">
          Cityzer
        </span>
      </h1>

      <div className="space-y-5">
        <p className="text-base leading-relaxed text-cityzer-texto">
          A Cityzer é uma plataforma colaborativa que
          permite registrar e consultar ocorrências nas
          vias, como acidentes, buracos, alagamentos,
          obras e árvores caídas.
        </p>

        <p className="text-base leading-relaxed text-cityzer-suave">
          Com informações compartilhadas e validadas
          pela comunidade, ajudamos as pessoas a
          conhecer melhor as condições das ruas e
          planejar seus deslocamentos.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="mt-8 h-[3px] w-12 rounded-full bg-cityzer-verde"
      />
    </section>
  );
}

export default CardApresentacao;
