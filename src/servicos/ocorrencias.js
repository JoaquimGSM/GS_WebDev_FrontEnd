import { supabase } from "./supabase";

const COLUNAS = [
  "id",
  "autor_id",
  "cidade",
  "categoria",
  "latitude",
  "longitude",
  "referencia",
  "descricao",
  "status",
  "criada_em",
  "atualizada_em",
].join(",");

const CATEGORIAS = [
  "acidente",
  "buraco",
  "alagamento",
  "obra",
  "arvore",
];

const NOMES = {
  acidente: "Acidente de trânsito",
  buraco: "Buraco na via",
  alagamento: "Alagamento",
  obra: "Obra na via",
  arvore: "Árvore caída",
};

function normalizarOcorrencia(registro) {
  return {
    id: registro.id,
    autorId: registro.autor_id,
    cidade: registro.cidade,
    categoria: registro.categoria,
    titulo: NOMES[registro.categoria] ?? "Ocorrência",
    posicao: [
      Number(registro.latitude),
      Number(registro.longitude),
    ],
    referencia: registro.referencia ?? "",
    descricao: registro.descricao,
    status: registro.status,
    criadaEm: registro.criada_em,
    atualizadaEm: registro.atualizada_em,
  };
}

function validarCampos(dados) {
  if (!CATEGORIAS.includes(dados.categoria)) {
    throw new Error("Selecione uma categoria válida.");
  }

  if ((dados.referencia ?? "").trim().length > 80) {
    throw new Error("A referência pode ter até 80 caracteres.");
  }

  const tamanho = (dados.descricao ?? "").trim().length;

  if (tamanho < 10 || tamanho > 300) {
    throw new Error(
      "A descrição deve ter entre 10 e 300 caracteres."
    );
  }
}

export async function listarMinhasOcorrencias(usuarioId) {
  if (!usuarioId) {
    throw new Error("Usuário não autenticado.");
  }

  const { data, error } = await supabase
    .from("ocorrencias")
    .select(COLUNAS)
    .eq("autor_id", usuarioId)
    .order("criada_em", { ascending: false });

  if (error) throw error;

  return (data ?? []).map(normalizarOcorrencia);
}

export async function criarOcorrencia(usuario, dados) {
  if (!usuario?.id) {
    throw new Error("Faça login para registrar ocorrências.");
  }

  validarCampos(dados);

  const latitude = Number(dados.localizacao?.[0]);
  const longitude = Number(dados.localizacao?.[1]);

  if (
    !Array.isArray(dados.localizacao) ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error("Localização inválida.");
  }

  const cidade = usuario.user_metadata?.cidade?.trim();

  if (!cidade || cidade.length < 2 || cidade.length > 120) {
    throw new Error("Cidade não encontrada no cadastro.");
  }

  const { data, error } = await supabase
    .from("ocorrencias")
    .insert({
      autor_id: usuario.id,
      cidade,
      categoria: dados.categoria,
      latitude,
      longitude,
      referencia: dados.referencia.trim(),
      descricao: dados.descricao.trim(),
    })
    .select(COLUNAS)
    .single();

  if (error) throw error;

  return normalizarOcorrencia(data);
}

export async function atualizarOcorrencia(
  usuarioId,
  ocorrenciaId,
  alteracoes
) {
  if (!usuarioId) {
    throw new Error("Usuário não autenticado.");
  }

  validarCampos(alteracoes);

  const { data, error } = await supabase
    .from("ocorrencias")
    .update({
      categoria: alteracoes.categoria,
      referencia: alteracoes.referencia.trim(),
      descricao: alteracoes.descricao.trim(),
      atualizada_em: new Date().toISOString(),
    })
    .eq("id", ocorrenciaId)
    .eq("autor_id", usuarioId)
    .select(COLUNAS)
    .single();

  if (error) throw error;

  return normalizarOcorrencia(data);
}

export async function excluirOcorrencia(
  usuarioId,
  ocorrenciaId
) {
  if (!usuarioId) {
    throw new Error("Usuário não autenticado.");
  }

  const { data, error } = await supabase
    .from("ocorrencias")
    .delete()
    .eq("id", ocorrenciaId)
    .eq("autor_id", usuarioId)
    .select("id")
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    throw new Error(
      "Ocorrência não encontrada ou acesso não permitido."
    );
  }

  return true;
}
