import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

import { supabase } from "../../servicos/supabase";

import {
  listarMinhasOcorrencias,
  criarOcorrencia,
  atualizarOcorrencia,
  excluirOcorrencia,
} from "../../servicos/ocorrencias";

import TelaBoasVindas from "./TelaBoasVindas";
import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import TelaMapa from "./TelaMapa";
import FormularioOcorrencia from "./FormularioOcorrencia";
import DetalhesOcorrencia from "./DetalhesOcorrencia";
import TelaMinhasOcorrencias from "./TelaMinhasOcorrencias";
import TelaConfirmacaoOcorrencia from "./TelaConfirmacaoOcorrencia";

function Aplicativo() {
  const [telaAtual, setTelaAtual] = useState("boas-vindas");
  const [usuario, setUsuario] = useState(null);
  const [carregandoSessao, setCarregandoSessao] = useState(true);
  const [erroSessao, setErroSessao] = useState("");

  const [localizacaoSelecionada, setLocalizacaoSelecionada] =
    useState(null);

  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] =
    useState(null);

  const [categoriaAtiva, setCategoriaAtiva] =
    useState("todos");

  const [minhasOcorrencias, setMinhasOcorrencias] =
    useState([]);

  const [carregandoMinhas, setCarregandoMinhas] =
    useState(false);

  const [erroMinhas, setErroMinhas] = useState("");
  const [respostasDemonstracao, setRespostasDemonstracao] =
    useState({});

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (evento, sessao) => {
        const usuarioAtual = sessao?.user ?? null;

        setUsuario(usuarioAtual);
        setCarregandoSessao(false);

        if (
          evento === "INITIAL_SESSION" &&
          usuarioAtual
        ) {
          setTelaAtual("mapa");
          setErroSessao("");
        }

        if (evento === "SIGNED_IN" && usuarioAtual) {
          setTelaAtual((atual) =>
            ["boas-vindas", "login", "cadastro"].includes(atual)
              ? "mapa"
              : atual
          );
          setErroSessao("");
        }

        if (evento === "SIGNED_OUT") {
          setTelaAtual("boas-vindas");
          setLocalizacaoSelecionada(null);
          setOcorrenciaSelecionada(null);
          setMinhasOcorrencias([]);
          setRespostasDemonstracao({});
          setErroMinhas("");
          setErroSessao("");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (telaAtual !== "minhas" || !usuario?.id) {
      return;
    }

    let ativo = true;

    setCarregandoMinhas(true);
    setErroMinhas("");

    listarMinhasOcorrencias(usuario.id)
      .then((registros) => {
        if (ativo) {
          setMinhasOcorrencias(registros);
        }
      })
      .catch((error) => {
        if (ativo) {
          setErroMinhas(
            error.message ||
              "Não foi possível carregar suas ocorrências."
          );
        }
      })
      .finally(() => {
        if (ativo) {
          setCarregandoMinhas(false);
        }
      });

    return () => {
      ativo = false;
    };
  }, [telaAtual, usuario?.id]);

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

  async function sairDaConta() {
    setErroSessao("");

    try {
      const { error } = await supabase.auth.signOut({
        scope: "local",
      });

      if (error) throw error;

      setUsuario(null);
      setTelaAtual("boas-vindas");
      setMinhasOcorrencias([]);
    } catch (error) {
      setErroSessao(
        error.message || "Não foi possível sair."
      );
    }
  }

  function iniciarRegistro(localizacao) {
    setLocalizacaoSelecionada(localizacao);
    setTelaAtual("registrar");
  }

  async function salvarNovaOcorrencia(dados) {
    if (!usuario) {
      throw new Error("Faça login para registrar ocorrências.");
    }

    const registro = await criarOcorrencia(usuario, dados);

    setMinhasOcorrencias((anteriores) => [
      registro,
      ...anteriores,
    ]);

    setLocalizacaoSelecionada(null);
    setTelaAtual("minhas");
  }

  async function editarMinhaOcorrencia(id, alteracoes) {
    if (!usuario) {
      throw new Error("Usuário não autenticado.");
    }

    const atualizada = await atualizarOcorrencia(
      usuario.id,
      id,
      alteracoes
    );

    setMinhasOcorrencias((anteriores) =>
      anteriores.map((ocorrencia) =>
        ocorrencia.id === id ? atualizada : ocorrencia
      )
    );
  }

  async function excluirMinhaOcorrencia(id) {
    if (!usuario) {
      throw new Error("Usuário não autenticado.");
    }

    await excluirOcorrencia(usuario.id, id);

    setMinhasOcorrencias((anteriores) =>
      anteriores.filter((ocorrencia) => ocorrencia.id !== id)
    );
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

  function renderizarMapa() {
    return (
      <TelaMapa
        usuario={usuario}
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
          usuario={usuario}
          onVoltar={voltarParaMapa}
          onSalvar={salvarNovaOcorrencia}
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
          usuario={usuario}
          ocorrencias={minhasOcorrencias}
          carregando={carregandoMinhas}
          erroCarregamento={erroMinhas}
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
