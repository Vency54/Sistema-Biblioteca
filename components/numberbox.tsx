"use client";

import alterarQuantidade from "@/actions/alterarQuantidade";

type Parametros = {
  ISBN: string;
  quantidade: number;
};

export default function Disponivel({ ISBN, quantidade }: Parametros) {
  return (
    <>
      <input
        type="number"
        min={0}
        defaultValue={quantidade}
        onBlur={(e) => alterarQuantidade(ISBN, Number(e.target.value))}
      />
    </>
  );
}
