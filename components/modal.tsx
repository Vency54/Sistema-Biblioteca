"use client";
import { useActionState, useState } from "react";
import styles from "./components.module.css";
import { Livro } from "@/type/Livro";
import CriarLivro from "@/actions/criarLivro";
import AlterarLivro from "@/actions/alterarLivro";

type Props = {
  livro: Livro;
};

export default function Modal({ livro }: Props) {
  const estadoInicial = {
    message: "",
  };

  const [aberto, setaberto] = useState(false);
  const [estado, formAction, pendente] = useActionState(
    AlterarLivro,
    estadoInicial,
  );

  return (
    <div>
      <button onClick={() => setaberto(true)}>Editar</button>
      {aberto && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.container}>
              <h2>Editar Livro</h2>
              <form
                action={formAction}
                className="p-4 max-w-md mx-auto form flex flex-col gap-4"
              >
                <input type="hidden" name="ISBNOriginal" value={livro.ISBN} />
                <input
                  type="text"
                  placeholder="Escreva o nome do livro"
                  name="Nome"
                  defaultValue={livro.Nome}
                  className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
                />
                <input
                  type="text"
                  placeholder="Escreva o nome do Autor"
                  name="Autor"
                  defaultValue={livro.Autor}
                  className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
                />
                <input
                  type="text"
                  placeholder="Escreva o ISBN"
                  name="ISBN"
                  defaultValue={livro.ISBN}
                  className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
                />
                <input
                  type="number"
                  placeholder="Escreva o ano"
                  name="Ano"
                  min={0}
                  defaultValue={livro.Ano}
                  className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
                />
                <input
                  type="number"
                  placeholder="Escreva a Quantidade"
                  min={0}
                  name="Quantidade"
                  defaultValue={livro.Quantidade}
                  className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
                />
                <p className="text-red-500">{estado.message}</p>
                <button
                  className="btn btn-primary text-white border bg-black p-2 my-2 h-10"
                  disabled={pendente}
                >
                  {pendente ? "Alterando..." : "Alterar Livro"}
                </button>
              </form>
              <button onClick={() => setaberto(false)}>Fechar</button>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
}
