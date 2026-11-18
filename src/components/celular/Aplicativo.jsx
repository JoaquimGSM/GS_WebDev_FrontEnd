import { useState } from "react";

import TelaBoasVindas from "./TelaBoasVindas";
import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import TelaMapa from "./TelaMapa";
import FormularioOcorrencia from "./FormularioOcorrencia";
import DetalhesOcorrencia from "./DetalhesOcorrencia";
import TelaMinhasOcorrencias from "./TelaMinhasOcorrencias";
import TelaConfirmacaoOcorrencia from "./TelaConfirmacaoOcorrencia";

// Dados fictícios para testar o gerenciamento
const REGISTROS_DEMONSTRACAO = [
  {
    id: "minha-demo-1",
    categoria: "buraco",
    referencia: "Próximo ao cruzamento",
    descricao:
      "Exemplo fictício de um buraco dificultando a passagem de veículos.",
    posicao: [-23.5525, -46.6342],
  },
  {
    id: "minha-demo-2",
    categoria: "alagamento",
    referencia: "Próximo ao viaduto",
    descricao:
      "Exemplo fictício de acúmulo de água prejudicando a circulação.",
    posicao: [-23.5614, -46.6573],
  },
  {
    id: "minha-demo-3",
    categoria: "arvore",
    referencia: "Ao lado da praça",
    descricao:
      "Exemplo fictício de árvore caída bloqueando parcialmente a via.",
    posicao: [-23.5472, -46.6221],
  },
];

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

  const [categoriaAtiva, setCategoriaAtiva] =
    useState("todos");

  const [minhasOcorrencias, setMinhasOcorrencias] =
    useState(() => [...REGISTROS_DEMONSTRACAO]);

  // Respostas de teste, organizadas pelo ID da ocorrência
  const [
    respostasDemonstracao,
    setRespostasDemonstracao,
  ] = useState({});

  const respostaDaOcorrencia = ocorrenciaSelecionada
    ? respostasDemonstracao[ocorrenciaSelecionada.id] ?? null
    : null;

  function navegarPara(tela) {
    setTelaAtual(tela);
  }

  function voltar() {
    setTelaAtual("boas-vindas");
  }

  function voltarParaMapa() {
    setTelaAtual("mapa");
  }

  function voltarParaDetalhes() {
    setTelaAtual("detalhes");
  }

  function iniciarRegistro(localizacao) {
    setLocalizacaoSelecionada(localizacao);
    setTelaAtual("registrar");
  }

  function abrirDetalhes(ocorrencia) {
    setOcorrenciaSelecionada(ocorrencia);
    setTelaAtual("detalhes");
  }

  function abrirConfirmacao() {
    if (!ocorrenciaSelecionada) return;

    setTelaAtual("confirmacao");
  }

  // Registra uma resposta somente nesta sessão React.
  // Não envia dados à API nem valida usuários reais.
  function confirmarDemonstracao(resposta) {
    if (!ocorrenciaSelecionada) return;

    if (resposta !== "sim" && resposta !== "nao") {
      return;
    }

    const id = ocorrenciaSelecionada.id;

    setRespostasDemonstracao((anteriores) => {
      // Impede uma segunda resposta de teste para
      // a mesma ocorrência enquanto a página estiver aberta.
      if (
        Object.prototype.hasOwnProperty.call(
          anteriores,
          id
        )
      ) {
        return anteriores;
      }

      return {
        ...anteriores,
        [id]: resposta,
      };
    });
  }

  function editarMinhaOcorrencia(id, alteracoes) {
    setMinhasOcorrencias((anteriores) =>
      anteriores.map((ocorrencia) =>
        ocorrencia.id === id
          ? { ...ocorrencia, ...alteracoes }
          : ocorrencia
      )
    );
  }

  function excluirMinhaOcorrencia(id) {
    setMinhasOcorrencias((anteriores) =>
      anteriores.filter(
        (ocorrencia) => ocorrencia.id !== id
      )
    );
  }

  function renderizarMapa() {
    return (
      <TelaMapa
        onVoltar={voltar}
        onRegistrar={iniciarRegistro}
        onAbrirDetalhes={abrirDetalhes}
        onAbrirMinhas={() => navegarPara("minhas")}
        categoriaAtiva={categoriaAtiva}
        onAlterarCategoria={setCategoriaAtiva}
      />
    );
  }

  function renderizarDetalhes() {
    if (!ocorrenciaSelecionada) {
      return renderizarMapa();
    }

    return (
      <DetalhesOcorrencia
        ocorrencia={ocorrenciaSelecionada}
        respostaDemonstracao={respostaDaOcorrencia}
        onVoltar={voltarParaMapa}
        onAbrirConfirmacao={abrirConfirmacao}
      />
    );
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
      return renderizarMapa();

    case "registrar":
      return localizacaoSelecionada ? (
        <FormularioOcorrencia
          localizacao={localizacaoSelecionada}
          onVoltar={voltarParaMapa}
        />
      ) : (
        renderizarMapa()
      );

    case "detalhes":
      return renderizarDetalhes();

    case "confirmacao":
      return ocorrenciaSelecionada ? (
        <TelaConfirmacaoOcorrencia
          ocorrencia={ocorrenciaSelecionada}
          respostaAnterior={respostaDaOcorrencia}
          onVoltar={voltarParaDetalhes}
          onConfirmar={confirmarDemonstracao}
        />
      ) : (
        renderizarMapa()
      );

    case "minhas":
      return (
        <TelaMinhasOcorrencias
          ocorrencias={minhasOcorrencias}
          onVoltar={voltarParaMapa}
          onEditar={editarMinhaOcorrencia}
          onExcluir={excluirMinhaOcorrencia}
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
