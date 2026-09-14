"use client";

import { useActionState, useState } from "react";
import { Emprestimo } from "@/type/Emprestimo";
import CriarLeitor from "@/actions/criarLeitor";
import AlterarLeitor from "@/actions/AlterarLeitor";

type Leitor = {
  IdLeitor: string;
  Cpf: string;
  Nome: string;
  Idade: string;
  Email: string;
  Telefone: string;
  Imagem?: string | null;
  emprestimos?: Emprestimo[];
};

type Props = {
  leitor?: Leitor;
};

const estadoInicial = {
  message: "",
};

export default function FormularioLeitor({ leitor }: Props) {
  const [estado, formAction, pendente] = useActionState(
    leitor ? AlterarLeitor : CriarLeitor,
    estadoInicial,
  );

  const [imagemPreview, setImagemPreview] = useState<string | null>(
    leitor?.Imagem || null,
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
      <input
        type="hidden"
        name="IdLeitorOriginal"
        value={leitor?.IdLeitor || ""}
      />

      <input
        type="text"
        placeholder="Escreva o nome do leitor*"
        name="Nome"
        defaultValue={leitor?.Nome || ""}
        className="border rounded-lg px-3 py-1 h-9 w-full"
      />

      <input
        type="text"
        placeholder="Escreva o CPF*"
        name="Cpf"
        defaultValue={leitor?.Cpf || ""}
        className="border rounded-lg px-3 py-1 h-9 w-full"
      />

      <input
        type="number"
        placeholder="Escreva a idade*"
        name="Idade"
        defaultValue={leitor?.Idade || ""}
        className="border rounded-lg px-3 py-1 h-9 w-full"
      />

      <input
        type="email"
        placeholder="Escreva o email*"
        name="Email"
        defaultValue={leitor?.Email || ""}
        className="border rounded-lg px-3 py-1 h-9 w-full"
      />

      <input
        type="tel"
        placeholder="Escreva o telefone*"
        name="Telefone"
        defaultValue={leitor?.Telefone || ""}
        className="border rounded-lg px-3 py-1 h-9 w-full"
      />

      {/* Imagem */}
      <div className="flex flex-col gap-2">
        <label htmlFor="Imagem" className="font-medium">
          Imagem do leitor
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
            alt="Prévia do leitor"
            className="w-32 h-44 object-cover rounded-lg border mx-auto"
          />
        )}
      </div>

      <p className="text-red-500">{estado.message}</p>

      <button
        type="submit"
        disabled={pendente}
        className="btn btn-primary text-white border bg-black p-2 my-2 h-10"
      >
        {pendente
          ? "Salvando..."
          : leitor
            ? "Salvar alterações"
            : "Adicionar Leitor"}
      </button>
    </form>
  );
}
