import { useState } from "react";

import TelaBoasVindas from "./TelaBoasVindas";
import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import TelaMapa from "./TelaMapa";
import FormularioOcorrencia from "./FormularioOcorrencia";
import DetalhesOcorrencia from "./DetalhesOcorrencia";

function Aplicativo() {
  const [telaAtual, setTelaAtual] =
    useState("boas-vindas");

  const [
    localizacaoSelecionada,
    setLocalizacaoSelecionada,
  ] = useState(null);

  const [
    ocorrenciaSelecionada,
    setOcorrenciaSelecionada,
  ] = useState(null);

  // O filtro permanece salvo ao mudar de tela
  const [categoriaAtiva, setCategoriaAtiva] =
    useState("todos");

  function navegarPara(tela) {
    setTelaAtual(tela);
  }

  function voltar() {
    setTelaAtual("boas-vindas");
  }

  function voltarParaMapa() {
    setTelaAtual("mapa");
  }

  function iniciarRegistro(localizacao) {
    setLocalizacaoSelecionada(localizacao);
    setTelaAtual("registrar");
  }

  function abrirDetalhes(ocorrencia) {
    setOcorrenciaSelecionada(ocorrencia);
    setTelaAtual("detalhes");
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
          onAbrirDetalhes={abrirDetalhes}
          categoriaAtiva={categoriaAtiva}
          onAlterarCategoria={setCategoriaAtiva}
        />
      );

    case "registrar":
      return localizacaoSelecionada ? (
        <FormularioOcorrencia
          localizacao={localizacaoSelecionada}
          onVoltar={voltarParaMapa}
        />
      ) : (
        <TelaMapa
          onVoltar={voltar}
          onRegistrar={iniciarRegistro}
          onAbrirDetalhes={abrirDetalhes}
          categoriaAtiva={categoriaAtiva}
          onAlterarCategoria={setCategoriaAtiva}
        />
      );

    case "detalhes":
      return ocorrenciaSelecionada ? (
        <DetalhesOcorrencia
          ocorrencia={ocorrenciaSelecionada}
          onVoltar={voltarParaMapa}
        />
      ) : (
        <TelaMapa
          onVoltar={voltar}
          onRegistrar={iniciarRegistro}
          onAbrirDetalhes={abrirDetalhes}
          categoriaAtiva={categoriaAtiva}
          onAlterarCategoria={setCategoriaAtiva}
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
