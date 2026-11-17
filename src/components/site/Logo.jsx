function Logo() {
  return (
    <div
      className="inline-flex select-none items-center gap-3"
      aria-label="Cityzer"
    >
      {/* Símbolo da Cityzer */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
      >
        <defs>
          <linearGradient
            id="cityzer-logo-gradient"
            x1="5"
            y1="5"
            x2="43"
            y2="43"
          >
            <stop stopColor="#50E8B0" />
            <stop offset="1" stopColor="#16C6CC" />
          </linearGradient>
        </defs>

        {/* Letra C estilizada */}
        <path
          d="M35 10A17 17 0 1 0 35 38"
          stroke="url(#cityzer-logo-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Representação de uma via */}
        <path
          d="M18 24H35"
          stroke="#50E8B0"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="5 5"
        />
      </svg>

      {/* Nome */}
      <span className="text-[1.9rem] font-extrabold tracking-[-0.055em] sm:text-[2.4rem]">
        <span className="text-cityzer-texto">City</span>
        <span className="text-cityzer-verde">zer</span>
      </span>
    </div>
  );
}

export default Logo;
