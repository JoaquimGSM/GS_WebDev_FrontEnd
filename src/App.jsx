
import FundoCidade from "./components/site/FundoCidade";
import Logo from "./components/site/Logo";

function App() {
  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-cityzer-fundo">
      {/* Fundo fotográfico */}
      <FundoCidade />

      {/* Logo no canto superior esquerdo */}
      <header className="absolute left-0 top-0 z-20 w-full px-6 py-5 sm:px-10 sm:py-7 lg:px-14">
        <Logo />
      </header>

      {/* Área principal */}
      <main className="relative z-10 min-h-dvh">
        {/* Card e celular serão adicionados depois */}
      </main>
    </div>
  );
}

export default App;
