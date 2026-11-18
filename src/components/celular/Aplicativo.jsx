import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import TelaBoasVindas from "./TelaBoasVindas";

function Aplicativo() {
  const [telaAtual, setTelaAtual] = useState("boas-vindas");

  function navegarPara(tela) {
    setTelaAtual(tela);
  }

  function voltar() {
    setTelaAtual("boas-vindas");
  }

  if (telaAtual === "boas-vindas") {
    return (
      <TelaBoasVindas
        onEntrar={() => navegarPara("login")}
        onCriarConta={() => navegarPara("cadastro")}
      />
    );
  }

  // Telas temporárias até implementarmos os formulários
  const titulo = telaAtual === "login" ? "Entrar" : "Criar conta";

  return (
    <section className="flex min-h-full flex-col bg-cityzer-fundo px-6 py-6">

      <button
        type="button"
        onClick={voltar}
        className="flex w-fit cursor-pointer items-center gap-2 text-sm text-cityzer-suave hover:text-cityzer-verde"
      >
        <ArrowLeft size={18} />
        Voltar
      </button>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-cityzer-texto">
          {titulo}
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-cityzer-suave">
          Esta tela será implementada nos próximos passos.
        </p>
      </div>

    </section>
  );
}

export default Aplicativo;
