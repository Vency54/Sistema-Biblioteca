"use client";

import CriarLivro from "@/actions/criarLivro";
import AlterarLivro from "@/actions/alterarLivro";
import { useActionState, useState } from "react";

type Livro = {
  id: string;
  Nome: string;
  Autor: string;
  ISBN: string;
  Ano: string;
  Genero: string;
  Sinopse: string;
  Quantidade: string;
  Imagem?: string;
};

type Props = {
  livro?: Livro;
};

const estadoInicial = {
  message: "",
};

export default function FormularioLivro({ livro }: Props) {
  const [estado, formAction, pendente] = useActionState(
    livro ? AlterarLivro : CriarLivro,
    estadoInicial,
  );

  const [imagemPreview, setImagemPreview] = useState<string | null>(
    livro?.Imagem || null,
  );

  function selecionarImagem(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];

    if (arquivo) {
      const url = URL.createObjectURL(arquivo);
      setImagemPreview(url);
    }
  }

  return (
    <form
      action={formAction}
      className="p-4 max-w-md mx-auto flex flex-col gap-4"
    >
      {livro && <input type="hidden" name="id" value={livro.id} />}

      <input
        type="text"
        placeholder="Escreva o nome do livro*"
        name="Nome"
        defaultValue={livro?.Nome || ""}
        className="border rounded-lg px-3 py-1 h-9 w-full"
      />

      <input
        type="text"
        placeholder="Escreva o nome do autor*"
        name="Autor"
        defaultValue={livro?.Autor || ""}
        className="border rounded-lg px-3 py-1 h-9 w-full"
      />

      <input
        type="text"
        placeholder="Escreva o ISBN*"
        name="ISBN"
        defaultValue={livro?.ISBN || ""}
        className="border rounded-lg px-3 py-1 h-9 w-full"
      />

      <input
        type="number"
        placeholder="Escreva o ano*"
        name="Ano"
        defaultValue={livro?.Ano || ""}
        className="border rounded-lg px-3 py-1 h-9 w-full"
      />

      <input
        type="text"
        placeholder="Escreva o gênero*"
        name="Genero"
        defaultValue={livro?.Genero || ""}
        className="border rounded-lg px-3 py-1 h-9 w-full"
      />

      <textarea
        name="Sinopse"
        placeholder="Escreva a sinopse*"
        rows={5}
        defaultValue={livro?.Sinopse || ""}
        className="border rounded-lg px-3 py-2 w-full"
      />

      {/* Imagem */}
      <div className="flex flex-col gap-2">
        <label htmlFor="Imagem" className="font-medium">
          Capa do livro
        </label>

        <input
          type="file"
          name="Imagem"
          id="Imagem"
          accept="image/png, image/jpeg, image/webp"
          onChange={selecionarImagem}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium"
        />

        {imagemPreview && (
          <img
            src={imagemPreview}
            alt="Prévia da capa"
            className="w-32 h-44 object-cover rounded-lg border mx-auto"
          />
        )}
      </div>

      <input
        type="number"
        placeholder="Escreva a quantidade*"
        name="Quantidade"
        defaultValue={livro?.Quantidade || ""}
        className="border rounded-lg px-3 py-1 h-9 w-full"
      />

      <p className="text-red-500">{estado.message}</p>

      <button
        type="submit"
        disabled={pendente}
        className="btn btn-primary text-white border bg-black p-2 my-2 h-10"
      >
        {pendente
          ? "Salvando..."
          : livro
            ? "Salvar alterações"
            : "Adicionar Livro"}
      </button>
    </form>
  );
}
