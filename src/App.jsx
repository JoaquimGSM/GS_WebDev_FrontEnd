import FundoCidade from "./components/site/FundoCidade";
import Logo from "./components/site/Logo";
import CardApresentacao from "./components/site/CardApresentacao";

function App() {
  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-cityzer-fundo">

      {/* Fundo de São Paulo */}
      <FundoCidade />

      {/* Logo */}
      <header className="absolute left-0 top-0 z-20 w-full px-6 py-5 sm:px-10 sm:py-7 lg:px-14">
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
          xl:grid-cols-[minmax(0,1fr)_minmax(340px,380px)_minmax(0,1fr)]
          xl:px-14 xl:pt-24
        "
      >
        {/* Coluna esquerda */}
        <div className="flex min-w-0 justify-center xl:justify-start">
          <CardApresentacao />
        </div>

        {/* Coluna central: futuro celular */}
        <div className="hidden xl:block">
          {/* Celular será implementado no passo 11 */}
        </div>

        {/* Coluna direita: espaço reservado */}
        <div className="hidden xl:block" />
      </main>
    </div>
  );
}

export default App;
