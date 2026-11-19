import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  MapPin,
  CheckCircle2,
  Pencil,
  LoaderCircle,
} from "lucide-react";

import {
  CATEGORIAS_OCORRENCIAS,
} from "../../dados/ocorrenciasDemonstracao";

function FormularioOcorrencia({
  localizacao,
  usuario,
  onVoltar,
  onSalvar,
}) {
  const [categoria, setCategoria] = useState("");
  const [referencia, setReferencia] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const [validado, setValidado] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const latitude = localizacao?.[0];
  const longitude = localizacao?.[1];

  const categoriaSelecionada = CATEGORIAS_OCORRENCIAS.find(
    (item) => item.id === categoria
  );

  function validarFormulario(evento) {
    evento.preventDefault();
    setErro("");

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      setErro("Selecione uma localização válida.");
      return;
    }

    if (!categoriaSelecionada) {
      setErro("Selecione o tipo da ocorrência.");
      return;
    }

    if (descricao.trim().length < 10) {
      setErro("A descrição deve ter pelo menos 10 caracteres.");
      return;
    }

    setValidado(true);
  }

  async function salvarRegistro() {
    if (!usuario) {
      setErro("Faça login para salvar uma ocorrência.");
      return;
    }

    setSalvando(true);
    setErro("");

    try {
      await onSalvar({
        localizacao,
        categoria,
        referencia: referencia.trim(),
        descricao: descricao.trim(),
      });
    } catch (error) {
      setErro(
        error.message ||
          "Não foi possível salvar a ocorrência."
      );
    } finally {
      setSalvando(false);
    }
  }

  if (validado) {
    return (
      <section className="flex min-h-full flex-col bg-cityzer-fundo px-5 py-6">
        <button
          type="button"
          onClick={onVoltar}
          disabled={salvando}
          className="flex w-fit items-center gap-2 text-sm text-cityzer-suave hover:text-cityzer-verde"
        >
          <ArrowLeft size={18} />
          Voltar ao mapa
        </button>

        <div className="mt-10 flex flex-col items-center text-center">
          <div className="flex h-18 w-18 items-center justify-center rounded-2xl border border-cityzer-verde/30 bg-cityzer-verde/10">
            <CheckCircle2
              size={36}
              className="text-cityzer-verde"
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-cityzer-texto">
            Conferir ocorrência
          </h1>

          <p className="mt-3 text-sm text-cityzer-suave">
            Verifique os dados antes de salvar.
          </p>
        </div>

        <div className="mt-7 space-y-4 rounded-2xl border border-white/10 bg-cityzer-superficie p-4 text-left">
          <div>
            <p className="text-xs text-cityzer-suave">
              Categoria
            </p>
            <p className="mt-1 text-sm font-semibold text-cityzer-texto">
              {categoriaSelecionada.nome}
            </p>
          </div>

          <div>
            <p className="text-xs text-cityzer-suave">
              Localização
            </p>
            <p className="mt-1 text-xs text-cityzer-texto">
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
          O registro será criado como pendente.
          Ele não aparecerá no mapa público até
          cumprir as regras de validação colaborativa.
        </p>

        {!usuario && (
          <p className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-xs text-amber-200">
            Entre na sua conta antes de salvar.
          </p>
        )}

        {erro && (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-xs text-red-300"
          >
            {erro}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              setValidado(false);
              setErro("");
            }}
            disabled={salvando}
            className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-cityzer-verde/40 text-sm font-semibold text-cityzer-verde"
          >
            <Pencil size={17} />
            Editar informações
          </button>

          <button
            type="button"
            onClick={salvarRegistro}
            disabled={salvando || !usuario}
            className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cityzer-verde text-sm font-semibold text-cityzer-fundo disabled:cursor-not-allowed disabled:opacity-40"
          >
            {salvando ? (
              <>
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />
                Salvando...
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                Salvar ocorrência
              </>
            )}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-full flex-col bg-cityzer-fundo px-5 pb-7 pt-4">
      <button
        type="button"
        onClick={onVoltar}
        className="flex w-fit items-center gap-2 text-sm text-cityzer-suave hover:text-cityzer-verde"
      >
        <ArrowLeft size={18} />
        Voltar ao mapa
      </button>

      <div className="mb-6 mt-7">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cityzer-verde/30 bg-cityzer-verde/10">
          <ClipboardList
            size={25}
            className="text-cityzer-verde"
          />
        </div>

        <h1 className="text-2xl font-bold text-cityzer-texto">
          Nova ocorrência
          <span className="text-cityzer-verde">.</span>
        </h1>

        <p className="mt-2 text-sm text-cityzer-suave">
          Informe o problema encontrado na via.
        </p>
      </div>

      <div className="mb-6 flex items-start gap-3 rounded-xl border border-cityzer-verde/25 bg-cityzer-verde/5 p-3">
        <MapPin
          size={20}
          className="shrink-0 text-cityzer-verde"
        />

        <div>
          <p className="text-xs font-semibold text-cityzer-texto">
            Localização selecionada
          </p>

          <p className="mt-1 text-xs text-cityzer-suave">
            {Number.isFinite(latitude) &&
            Number.isFinite(longitude)
              ? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
              : "Nenhuma localização selecionada"}
          </p>
        </div>
      </div>

      <form
        onSubmit={validarFormulario}
        noValidate
        className="flex flex-col gap-5"
      >
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
            className="min-h-12 w-full rounded-xl border border-white/15 bg-cityzer-superficie px-3 text-sm text-cityzer-texto outline-none focus:border-cityzer-verde"
          >
            <option value="">Selecione o problema</option>

            {CATEGORIAS_OCORRENCIAS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>

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
            placeholder="Descreva o problema e como ele está afetando a via..."
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

        {erro && (
          <p
            role="alert"
            className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-xs text-red-300"
          >
            {erro}
          </p>
        )}

        <button
          type="submit"
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cityzer-verde font-semibold text-cityzer-fundo"
        >
          Conferir dados
          <ArrowRight size={18} />
        </button>
      </form>
    </section>
  );
}

export default FormularioOcorrencia;
