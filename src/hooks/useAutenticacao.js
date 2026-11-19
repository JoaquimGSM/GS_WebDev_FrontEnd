import { useCallback, useEffect, useState } from "react";
import { supabase } from "../servicos/supabase";

export default function useAutenticacao(onEvento) {
  const [usuario, setUsuario] = useState(null);
  const [carregandoSessao, setCarregandoSessao] = useState(true);
  const [erroSessao, setErroSessao] = useState("");
  const [eventoAutenticacao, setEventoAutenticacao] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((evento, sessao) => {
      const usuarioAtual = sessao?.user ?? null;

      setUsuario(usuarioAtual);
      setEventoAutenticacao(evento);
      setCarregandoSessao(false);

      if (
        evento === "INITIAL_SESSION" ||
        evento === "SIGNED_IN" ||
        evento === "SIGNED_OUT"
      ) {
        setErroSessao("");
      }

      onEvento?.(evento, usuarioAtual);
    });

    return () => subscription.unsubscribe();
  }, [onEvento]);

  const sairDaConta = useCallback(async () => {
    setErroSessao("");

    try {
      const { error } = await supabase.auth.signOut({
        scope: "local",
      });

      if (error) throw error;

      return true;
    } catch (error) {
      setErroSessao(
        error.message || "Não foi possível sair da conta."
      );

      return false;
    }
  }, []);

  return {
    usuario,
    carregandoSessao,
    erroSessao,
    eventoAutenticacao,
    sairDaConta,
  };
}
