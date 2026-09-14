"use client";

import alterarSituacao from "@/actions/alterarSituacao";
import { Situacoes } from "@/type/Emprestimo";

type Parametros = {
  id: string;
  situacao: Situacoes;
};

export default function Situacao({ id, situacao }: Parametros) {
  return (
    <>
      <select
        value={situacao}
        onChange={(e) => alterarSituacao(id, e.target.value as Situacoes)}
      >
        <option value="">Selecione uma opção</option>
        <option value="RESERVADO">Reservado</option>
        <option value="EMPRESTADO">Emprestado</option>
        <option value="DEVOLVIDO">Devolvido</option>
        <option value="ATRASADO">Atrasado</option>
      </select>
    </>
  );
}
