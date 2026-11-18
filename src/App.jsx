
import FundoCidade from "./components/site/FundoCidade";
import Logo from "./components/site/Logo";
import CardApresentacao from "./components/site/CardApresentacao";

import Celular from "./components/celular/Celular";
import Aplicativo from "./components/celular/Aplicativo";

function App() {
  return (
    <div className="relative isolate min-h-dvh bg-cityzer-fundo">
      {/* Fundo da Ponte Estaiada */}
      <FundoCidade />

      {/* Logo superior */}
      <header
        className="
          absolute left-0 top-0 z-20
          w-full px-6 py-5
          sm:px-10 sm:py-7
          lg:px-14
        "
      >
        <Logo />
      </header>

      {/* Conteúdo principal */}
      <main
        className="
          relative z-10
          mx-auto grid min-h-dvh
          w-full max-w-[1600px]
          grid-cols-1
          items-center gap-8
          px-6 pb-12 pt-32
          sm:px-10
          xl:grid-cols-[minmax(0,1fr)_minmax(320px,380px)_minmax(0,1fr)]
          xl:px-14 xl:pt-28
        "
      >
        {/* Card explicativo */}
        <div
          className="
            order-2 flex min-w-0 justify-center
            xl:order-1 xl:justify-start
          "
        >
          <CardApresentacao />
        </div>

        {/* Aplicativo dentro do celular */}
        <div className="order-1 min-w-0 xl:order-2">
          <Celular>
            <Aplicativo />
          </Celular>
        </div>

        {/* Espaço para manter o celular centralizado */}
        <div className="hidden xl:order-3 xl:block" />
      </main>
    </div>
  );
}

export default App;
