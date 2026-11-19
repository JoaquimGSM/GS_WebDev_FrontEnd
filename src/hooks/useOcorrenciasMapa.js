import { useCallback, useEffect, useState } from "react";

import {
  obterCidadePerfil,
  listarOcorrenciasPublicadas,
  listarOcorrenciasPendentes,
} from "../servicos/ocorrencias";

export default function useOcorrenciasMapa(usuarioId) {
  const [cidade, setCidade] = useState("São Paulo");
  const [publicadas, setPublicadas] = useState([]);
  const [pendentes, setPendentes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [atualizacao, setAtualizacao] = useState(0);

  const atualizarDados = useCallback(() => {
    setAtualizacao((anterior) => anterior + 1);
  }, []);

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      setCarregando(true);
      setErro("");

      try {
        const cidadeAtual = usuarioId
          ? await obterCidadePerfil(usuarioId)
          : "São Paulo";

        const [listaPublicadas, listaPendentes] =
          await Promise.all([
            listarOcorrenciasPublicadas(cidadeAtual),
            usuarioId
              ? listarOcorrenciasPendentes()
              : Promise.resolve([]),
          ]);

        if (!ativo) return;

        setCidade(cidadeAtual);
        setPublicadas(listaPublicadas);
        setPendentes(listaPendentes);
      } catch (error) {
        if (!ativo) return;

        setPublicadas([]);
        setPendentes([]);
        setErro(
          error.message ||
            "Não foi possível carregar as ocorrências."
        );
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarDados();

    return () => {
      ativo = false;
    };
  }, [usuarioId, atualizacao]);

  return {
    cidade,
    publicadas,
    pendentes,
    carregando,
    erro,
    atualizarDados,
  };
}
