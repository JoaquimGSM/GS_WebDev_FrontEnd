import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import TelaBoasVindas from "./TelaBoasVindas";
import TelaLogin from "./TelaLogin";

function Aplicativo() {
  const [telaAtual, setTelaAtual] = useState("boas-vindas");

  function navegarPara(tela) {
    setTelaAtual(tela);
  }

  function voltar() {
    setTelaAtual("boas-vindas");
  }

  // Tela inicial
  if (telaAtual === "boas-vindas") {
    return (
      <TelaBoasVindas
        onEntrar={() => navegarPara("login")}
        onCriarConta={() => navegarPara("cadastro")}
      />
    );
  }

  // Login
  if (telaAtual === "login") {
    return (
      <TelaLogin
        onVoltar={voltar}
        onCriarConta={() => navegarPara("cadastro")}
      />
    );
  }

  // Cadastro temporário
  if (telaAtual === "cadastro") {
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
            Criar conta
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-cityzer-suave">
            O formulário de cadastro será desenvolvido
            no próximo passo.
          </p>
        </div>
      </section>
    );
  }

  return null;
}

export default Aplicativo;
