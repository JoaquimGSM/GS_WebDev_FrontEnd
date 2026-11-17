
import FundoCidade from "./components/site/FundoCidade";

function App() {
  return (
    <div className="relative isolate min-h-dvh bg-cityzer-fundo">
      <FundoCidade />

      <main className="relative z-10 min-h-dvh">
        {/* Os componentes do site serão adicionados aqui */}
      </main>
    </div>
  );
}

export default App;
