import { useEffect, useState } from "react";

import { LoaderCircle } from "lucide-react";

import { supabase } from "../../servicos/supabase";

import TelaBoasVindas from "./TelaBoasVindas";
import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import TelaMapa from "./TelaMapa";
import FormularioOcorrencia from "./FormularioOcorrencia";
import DetalhesOcorrencia from "./DetalhesOcorrencia";
import TelaMinhasOcorrencias from "./TelaMinhasOcorrencias";
import TelaConfirmacaoOcorrencia from "./TelaConfirmacaoOcorrencia";

// Registros fictícios para testes.
// Ainda não são registros do usuário autenticado.
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

  const [usuario, setUsuario] =
    useState(null);

  const [carregandoSessao, setCarregandoSessao] =
    useState(true);

  const [erroSessao, setErroSessao] =
    useState("");

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

  const [
    respostasDemonstracao,
    setRespostasDemonstracao,
  ] = useState({});

  // Monitora login, logout e restauração de sessão.
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (evento, sessao) => {
        const usuarioAtual = sessao?.user ?? null;

        setUsuario(usuarioAtual);
        setCarregandoSessao(false);

        if (
          evento === "SIGNED_IN" ||
          (evento === "INITIAL_SESSION" && usuarioAtual)
        ) {
          setTelaAtual("mapa");
          setErroSessao("");
        }

        if (evento === "SIGNED_OUT") {
          setTelaAtual("boas-vindas");
          setLocalizacaoSelecionada(null);
          setOcorrenciaSelecionada(null);
          setErroSessao("");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

  // Encerra apenas a sessão deste navegador.
  async function sairDaConta() {
    setErroSessao("");

    try {
      const { error } = await supabase.auth.signOut({
        scope: "local",
      });

      if (error) {
        setErroSessao(
          "Não foi possível sair: " + error.message
        );
        return;
      }

      // O evento SIGNED_OUT também atualizará
      // o estado de autenticação.
      setUsuario(null);
      setTelaAtual("boas-vindas");
    } catch {
      setErroSessao(
        "Erro de conexão ao sair da conta."
      );
    }
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

  function confirmarDemonstracao(resposta) {
    if (!ocorrenciaSelecionada) return;

    if (resposta !== "sim" && resposta !== "nao") {
      return;
    }

    const id = ocorrenciaSelecionada.id;

    setRespostasDemonstracao((anteriores) => {
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
          ? {
              ...ocorrencia,
              ...alteracoes,
            }
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
        onSair={usuario ? sairDaConta : undefined}
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

  // Evita mostrar o login enquanto o Supabase
  // verifica se já existe uma sessão salva.
  if (carregandoSessao) {
    return (
      <div className="flex h-full min-h-80 flex-col items-center justify-center gap-4 bg-cityzer-fundo px-6 text-center">
        <LoaderCircle
          size={32}
          className="animate-spin text-cityzer-verde"
        />

        <p className="text-sm text-cityzer-suave">
          Verificando sua sessão...
        </p>
      </div>
    );
  }

  switch (telaAtual) {
    case "boas-vindas":
      return (
        <div className="h-full">
          <TelaBoasVindas
            onEntrar={() => navegarPara("login")}
            onCriarConta={() => navegarPara("cadastro")}
            onVisualizarMapa={() => navegarPara("mapa")}
          />

          {erroSessao && (
            <p
              role="alert"
              className="mx-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-xs text-red-300"
            >
              {erroSessao}
            </p>
          )}
        </div>
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
