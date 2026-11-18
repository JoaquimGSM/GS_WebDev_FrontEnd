import { useState } from "react";

import TelaBoasVindas from "./TelaBoasVindas";
import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import TelaMapa from "./TelaMapa";
import FormularioOcorrencia from "./FormularioOcorrencia";

function Aplicativo() {
  const [telaAtual, setTelaAtual] = useState("boas-vindas");

  const [
    localizacaoSelecionada,
    setLocalizacaoSelecionada,
  ] = useState(null);

  function navegarPara(tela) {
    setTelaAtual(tela);
  }

  function voltar() {
    setTelaAtual("boas-vindas");
  }

  function iniciarRegistro(localizacao) {
    setLocalizacaoSelecionada(localizacao);
    setTelaAtual("registrar");
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
          onRegistrar={iniciarRegistro}
        />
      );

    case "registrar":
      return localizacaoSelecionada ? (
        <FormularioOcorrencia
          localizacao={localizacaoSelecionada}
          onVoltar={() => navegarPara("mapa")}
        />
      ) : (
        <TelaMapa
          onVoltar={voltar}
          onRegistrar={iniciarRegistro}
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
