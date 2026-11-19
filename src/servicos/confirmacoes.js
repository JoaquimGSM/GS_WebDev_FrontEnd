import { supabase } from "./supabase";

export async function consultarConfirmacao(ocorrenciaId) {
  const { data, error } = await supabase.rpc(
    "consultar_confirmacao_cityzer",
    {
      p_ocorrencia_id: ocorrenciaId,
    }
  );

  if (error) throw error;

  return data;
}

export async function confirmarOcorrencia(
  ocorrenciaId,
  resposta
) {
  if (!["sim", "nao"].includes(resposta)) {
    throw new Error("Resposta inválida.");
  }

  const { data, error } = await supabase.rpc(
    "confirmar_ocorrencia_cityzer",
    {
      p_ocorrencia_id: ocorrenciaId,
      p_resposta: resposta,
    }
  );

  if (error) throw error;

  return data;
}
