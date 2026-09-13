"use client";
import CriarLeitor from "@/actions/criarLeitor";
import { useActionState, useState } from "react";

const estadoInicial = {
  message: "",
};

export default function Botao() {
  const [estado, formAction, pendente] = useActionState(
    CriarLeitor,
    estadoInicial,
  );

  const [imagemPreview, setImagemPreview] = useState<string | null>(null);

  function selecionarImagem(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (arquivo) {
      const url = URL.createObjectURL(arquivo);
      setImagemPreview(url);
    } else {
      setImagemPreview(null);
    }
  }

  return (
    <div>
      <form
        action={formAction}
        className="p-4 max-w-md mx-auto form flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Escreva o nome do leitor"
          name="Nome"
          className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
        />
        <input
          type="number"
          placeholder="Digite o cpf"
          name="Cpf"
          className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
        />
        <input
          type="number"
          placeholder="Digite a idade"
          name="Idade"
          className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
        />
        <input
          type="tel"
          placeholder="Escreva o telefone"
          name="Telefone"
          className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
          }}
        />
        <input
          type="email"
          placeholder="Escreva o email"
          name="Email"
          className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
        />

        <div className="flex flex-col gap-2">
          {" "}
          <label htmlFor="Imagem" className="font-medium">
            {" "}
            Imagem do Leitor{" "}
          </label>
          <input
            type="file"
            name="Imagem"
            accept="image/png, image/jpeg, image/webp"
            onChange={selecionarImagem}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
             file:mr-4 file:rounded-md file:border-0 file:bg-gray-100
             file:px-4 file:py-2 file:text-sm file:font-medium"
          />
          {imagemPreview && (
            <img
              src={imagemPreview}
              alt="Prévia da capa"
              className="w-32 h-44 object-cover rounded-lg border mx-auto"
            />
          )}{" "}
        </div>
        <p className="text-red-500">{estado.message}</p>
        <button
          className="btn btn-primary text-white border bg-black p-2 my-2 h-10"
          disabled={pendente}
        >
          {pendente ? "Cadastrando..." : "Cadastrar Leitor"}
        </button>
      </form>
    </div>
  );
}
