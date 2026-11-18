import { useState } from "react";

import TelaBoasVindas from "./TelaBoasVindas";
import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import TelaMapa from "./TelaMapa";

function Aplicativo() {
  const [telaAtual, setTelaAtual] = useState("boas-vindas");

  function navegarPara(tela) {
    setTelaAtual(tela);
  }

  function voltar() {
    setTelaAtual("boas-vindas");
  }

  switch (telaAtual) {

    case "boas-vindas":
      return (
        <TelaBoasVindas
          onEntrar={() => navegarPara("login")}
          onCriarConta={() => navegarPara("cadastro")}
          onVisualizarMapa={() => navegarPara("mapa")}
        />
      );

    case "login":
      return (
        <TelaLogin
          onVoltar={voltar}
          onCriarConta={() => navegarPara("cadastro")}
        />
      );

    case "cadastro":
      return (
        <TelaCadastro
          onVoltar={voltar}
          onEntrar={() => navegarPara("login")}
        />
      );

    case "mapa":
      return (
        <TelaMapa
          onVoltar={voltar}
        />
      );

    default:
      return (
        <TelaBoasVindas
          onEntrar={() => navegarPara("login")}
          onCriarConta={() => navegarPara("cadastro")}
          onVisualizarMapa={() => navegarPara("mapa")}
        />
      );
  }
}

export default Aplicativo;
