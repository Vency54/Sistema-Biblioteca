"use client";

import RemoverLivro from "@/actions/RemoverLivro";

type Parametros = {
  id: string;
  onClick: (id: string) => void;
};

export default function Situacao({ id, onClick }: Parametros) {
  return (
    <>
      <button onClick={() => onClick(id)}>Remover</button>
    </>
  );
}
