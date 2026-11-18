import FundoCidade from "./components/site/FundoCidade";
import Logo from "./components/site/Logo";
import CardApresentacao from "./components/site/CardApresentacao";

import Celular from "./components/celular/Celular";
import Aplicativo from "./components/celular/Aplicativo";

function App() {
  return (
    <div
      className="
        relative isolate
        min-h-dvh overflow-x-clip
        bg-cityzer-fundo
      "
    >
      {/* Paisagem de São Paulo */}
      <FundoCidade />

      {/* Logo superior */}
      <header
        className="
          absolute left-0 top-0 z-20
          w-full px-5 py-5
          sm:px-10 sm:py-7
          xl:px-14
        "
      >
        <Logo />
      </header>

      {/* Conteúdo principal */}
      <main
        className="
          relative z-10 mx-auto
          grid min-h-dvh w-full
          max-w-[1600px]
          grid-cols-1
          items-center
          gap-x-8 gap-y-10
          px-4 pb-12 pt-28

          sm:px-8 sm:pt-32

          xl:grid-cols-[minmax(0,1fr)_minmax(0,360px)_minmax(0,1fr)]
          xl:px-12 xl:pb-6 xl:pt-24
        "
      >
        {/* Card explicativo */}
        <div
          className="
            order-2 mx-auto
            w-full max-w-107.5
            xl:order-1 xl:mx-0
          "
        >
          <CardApresentacao />
        </div>

        {/* Celular central */}
        <div
          className="
            order-1 mx-auto w-full
            max-w-75
            sm:max-w-85
            xl:order-2 xl:max-w-71.25
            2xl:max-w-[320px]
          "
        >
          <Celular>
            <Aplicativo />
          </Celular>
        </div>

        {/* Coluna de equilíbrio no desktop */}
        <div
          aria-hidden="true"
          className="hidden xl:order-3 xl:block"
        />
      </main>
    </div>
  );
}

export default App;
