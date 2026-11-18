import { useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  ClipboardList,
  CheckCircle2,
  Pencil,
} from "lucide-react";

const categorias = [
  { valor: "acidente", nome: "Acidente" },
  { valor: "buraco", nome: "Buraco na via" },
  { valor: "alagamento", nome: "Alagamento" },
  { valor: "obra", nome: "Obra na via" },
  { valor: "arvore", nome: "Árvore caída" },
];

function FormularioOcorrencia({ localizacao, onVoltar }) {
  const [categoria, setCategoria] = useState("");
  const [referencia, setReferencia] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const [validado, setValidado] = useState(false);

  const latitude = localizacao?.[0];
  const longitude = localizacao?.[1];

  const categoriaSelecionada = categorias.find(
    (item) => item.valor === categoria
  );

  function validarFormulario(evento) {
    evento.preventDefault();
    setErro("");

    if (
      !Array.isArray(localizacao) ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      setErro("Selecione uma localização no mapa.");
      return;
    }

    if (!categoriaSelecionada) {
      setErro("Selecione o tipo da ocorrência.");
      return;
    }

    if (descricao.trim().length < 10) {
      setErro(
        "A descrição deve conter pelo menos 10 caracteres."
      );
      return;
    }

    // Nesta etapa não enviamos dados ao Supabase.
    // Apenas validamos a prévia do registro.
    setValidado(true);
  }

  // Confirmação da prévia
  if (validado) {
    return (
      <section className="flex min-h-full flex-col bg-cityzer-fundo px-5 py-6">

        <div className="flex flex-1 flex-col items-center justify-center text-center">

          <div className="mb-5 flex h-18 w-18 items-center justify-center rounded-2xl border border-cityzer-verde/30 bg-cityzer-verde/10">
            <CheckCircle2
              size={36}
              className="text-cityzer-verde"
            />
          </div>

          <h1 className="text-2xl font-bold text-cityzer-texto">
            Prévia validada!
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-cityzer-suave">
            Os dados do formulário estão corretos.
            Nenhuma ocorrência foi enviada ao banco.
          </p>

          <div className="mt-6 w-full space-y-3 rounded-2xl border border-white/10 bg-cityzer-superficie p-4 text-left">

            <div>
              <p className="text-xs text-cityzer-suave">
                Tipo de ocorrência
              </p>

              <p className="mt-1 text-sm font-semibold text-cityzer-texto">
                {categoriaSelecionada.nome}
              </p>
            </div>

            <div>
              <p className="text-xs text-cityzer-suave">
                Localização
              </p>

              <p className="mt-1 break-all text-xs text-cityzer-texto">
                {latitude.toFixed(5)}, {longitude.toFixed(5)}
              </p>
            </div>

            {referencia.trim() && (
              <div>
                <p className="text-xs text-cityzer-suave">
                  Referência
                </p>

                <p className="mt-1 wrap-break-word text-sm text-cityzer-texto">
                  {referencia.trim()}
                </p>
              </div>
            )}

            <div>
              <p className="text-xs text-cityzer-suave">
                Descrição
              </p>

              <p className="mt-1 wrap-break-word text-sm leading-relaxed text-cityzer-texto">
                {descricao.trim()}
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-cityzer-suave">
            O envio real será implementado na integração com o Supabase.
          </p>
        </div>

        <div className="mt-6 space-y-3">

          <button
            type="button"
            onClick={() => setValidado(false)}
            className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-cityzer-verde/40 text-sm font-semibold text-cityzer-verde"
          >
            <Pencil size={17} />
            Editar prévia
          </button>

          <button
            type="button"
            onClick={onVoltar}
            className="min-h-12 w-full cursor-pointer rounded-xl bg-cityzer-verde font-semibold text-cityzer-fundo"
          >
            Voltar ao mapa
          </button>

        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-full flex-col bg-cityzer-fundo px-5 pb-7 pt-4">

      {/* Voltar */}
      <button
        type="button"
        onClick={onVoltar}
        className="flex w-fit cursor-pointer items-center gap-2 text-sm text-cityzer-suave hover:text-cityzer-verde"
      >
        <ArrowLeft size={18} />
        Voltar ao mapa
      </button>

      {/* Cabeçalho */}
      <div className="mb-6 mt-7">

        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cityzer-verde/30 bg-cityzer-verde/10">
          <ClipboardList
            size={25}
            className="text-cityzer-verde"
          />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-cityzer-texto">
          Nova ocorrência
          <span className="text-cityzer-verde">.</span>
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-cityzer-suave">
          Informe o problema encontrado na via.
        </p>
      </div>

      {/* Localização escolhida */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-cityzer-verde/25 bg-cityzer-verde/5 p-3">

        <MapPin
          size={20}
          className="shrink-0 text-cityzer-verde"
        />

        <div>
          <p className="text-xs font-semibold text-cityzer-texto">
            Localização selecionada
          </p>

          <p className="mt-1 text-xs leading-relaxed text-cityzer-suave">
            {Number.isFinite(latitude) &&
            Number.isFinite(longitude)
              ? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
              : "Nenhuma localização selecionada"}
          </p>
        </div>
      </div>

      {/* Formulário */}
      <form
        onSubmit={validarFormulario}
        noValidate
        className="flex flex-col gap-5"
      >

        {/* Categoria */}
        <div>
          <label
            htmlFor="tipo-ocorrencia"
            className="mb-2 block text-sm font-medium text-cityzer-texto"
          >
            Tipo de ocorrência
          </label>

          <select
            id="tipo-ocorrencia"
            value={categoria}
            onChange={(evento) => {
              setCategoria(evento.target.value);
              setErro("");
            }}
            className="min-h-12 w-full cursor-pointer rounded-xl border border-white/15 bg-cityzer-superficie px-3 text-sm text-cityzer-texto outline-none focus:border-cityzer-verde"
          >
            <option value="">
              Selecione o problema
            </option>

            {categorias.map((item) => (
              <option
                key={item.valor}
                value={item.valor}
              >
                {item.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Referência */}
        <div>
          <label
            htmlFor="referencia-local"
            className="mb-2 block text-sm font-medium text-cityzer-texto"
          >
            Referência do local
            <span className="ml-1 text-xs font-normal text-cityzer-suave">
              (opcional)
            </span>
          </label>

          <input
            id="referencia-local"
            type="text"
            maxLength={80}
            placeholder="Ex.: próximo ao semáforo"
            value={referencia}
            onChange={(evento) => {
              setReferencia(evento.target.value);
              setErro("");
            }}
            className="min-h-12 w-full rounded-xl border border-white/15 bg-cityzer-superficie px-3 text-sm text-cityzer-texto outline-none placeholder:text-cityzer-suave/50 focus:border-cityzer-verde"
          />
        </div>

        {/* Descrição */}
        <div>
          <label
            htmlFor="descricao-ocorrencia"
            className="mb-2 block text-sm font-medium text-cityzer-texto"
          >
            Descrição do problema
          </label>

          <textarea
            id="descricao-ocorrencia"
            rows={5}
            maxLength={300}
            placeholder="Descreva o que aconteceu e como isso está afetando a via..."
            value={descricao}
            onChange={(evento) => {
              setDescricao(evento.target.value);
              setErro("");
            }}
            className="w-full resize-none rounded-xl border border-white/15 bg-cityzer-superficie p-3 text-sm leading-relaxed text-cityzer-texto outline-none placeholder:text-cityzer-suave/50 focus:border-cityzer-verde"
          />

          <p className="mt-1 text-right text-xs text-cityzer-suave">
            {descricao.length}/300
          </p>
        </div>

        {/* Erros */}
        {erro && (
          <p
            role="alert"
            className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-xs leading-relaxed text-red-300"
          >
            {erro}
          </p>
        )}

        {/* Aviso */}
        <p className="text-xs leading-relaxed text-cityzer-suave">
          Esta é uma prévia. O registro ainda não será
          enviado para outros usuários.
        </p>

        {/* Validar */}
        <button
          type="submit"
          className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cityzer-verde font-semibold text-cityzer-fundo transition-colors hover:bg-emerald-300"
        >
          Validar prévia
          <ArrowRight size={18} />
        </button>

      </form>
    </section>
  );
}

export default FormularioOcorrencia;
