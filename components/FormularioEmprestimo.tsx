"use client";

import AlterarEmprestimo from "@/actions/AlterarEmprestimo";
import criarEmprestimo from "@/actions/criarEmprestimo";
import { buscarLeitor } from "@/actions/buscarLeitor";
import { buscarLivros } from "@/actions/buscarLivro";
import { Emprestimo } from "@/type/Emprestimo";
import { Leitor } from "@/type/Leitores";
import { Livro } from "@/type/Livro";
import { useActionState, useEffect, useState } from "react";
import styles from "./FomularioEmprestimo.module.css";

type Props = {
  emprestimo?: Emprestimo;
};

const estadoInicial = {
  message: "",
};

export default function FormularioEmprestimo({ emprestimo }: Props) {
  const [estado, formAction, pendente] = useActionState(
    emprestimo ? AlterarEmprestimo : criarEmprestimo,
    estadoInicial,
  );

  const [livro, setLivro] = useState("");
  const [pesquisado, setPesquisado] = useState<Livro | undefined>();

  const [leitor, setLeitor] = useState("");
  const [pesquisadoLeitor, setPesquisadoLeitor] = useState<
    Leitor | undefined
  >();

  useEffect(() => {
    if (emprestimo) {
      setLivro(emprestimo.ISBN);
      setLeitor(emprestimo.leitorId);
    }
  }, [emprestimo]);

  useEffect(() => {
    async function pesquisar() {
      if (!livro.trim()) {
        setPesquisado(undefined);
        return;
      }

      const livros = await buscarLivros();

      const encontrado = livros.find(
        (l) => l.ISBN === livro || l.Nome.toLowerCase() === livro.toLowerCase(),
      );

      setPesquisado(encontrado);
    }

    pesquisar();
  }, [livro]);

  useEffect(() => {
    async function pesquisar() {
      if (!leitor.trim()) {
        setPesquisadoLeitor(undefined);
        return;
      }

      const leitores = await buscarLeitor();

      const encontrado = leitores.find(
        (l) =>
          l.IdLeitor === leitor ||
          l.Nome.toLowerCase() === leitor.toLowerCase(),
      );

      setPesquisadoLeitor(encontrado);
    }

    pesquisar();
  }, [leitor]);

  return (
    <div>
      <form
        action={formAction}
        className="p-4 max-w-md mx-auto flex flex-col gap-4"
      >
        <input
          type="hidden"
          name="IdEmprestimoOriginal"
          value={emprestimo?.IdEmprestimo || ""}
        />

        <input
          type="text"
          placeholder="Escreva o nome ou ISBN do Livro"
          value={livro}
          onChange={(e) => setLivro(e.target.value)}
          className="border rounded-lg px-3 py-1 h-9 w-full"
        />

        {pesquisado && (
          <div className={styles.card}>
            {pesquisado.Imagem && (
              <img src={pesquisado.Imagem} alt={pesquisado.Nome} />
            )}

            <div className={styles.titulo}>
              <h2>{pesquisado.Nome}</h2>
              <p>{pesquisado.Autor}</p>
            </div>

            <div className={styles.estoque}>
              {pesquisado.Quantidade !== "0" ? (
                <>
                  <p>Em estoque:</p>
                  <p>{pesquisado.Quantidade}</p>
                </>
              ) : (
                <p className="text-red-500">Fora de estoque</p>
              )}
            </div>

            <input type="hidden" name="ISBN" value={pesquisado.ISBN} />

            <input type="hidden" name="IdentLivro" value={pesquisado.Nome} />
          </div>
        )}

        <input
          type="text"
          placeholder="Escreva o nome ou ID do Leitor"
          value={leitor}
          onChange={(e) => setLeitor(e.target.value)}
          className="border rounded-lg px-3 py-1 h-9 w-full"
        />

        {pesquisadoLeitor && (
          <div className="border rounded-lg p-3">
            {pesquisadoLeitor.Imagem && (
              <img src={pesquisadoLeitor.Imagem} alt={pesquisadoLeitor.Nome} />
            )}

            <p>
              <strong>Nome:</strong> {pesquisadoLeitor.Nome}
            </p>

            <p>
              <strong>Idade:</strong> {pesquisadoLeitor.Idade}
            </p>

            <p>
              <strong>ID:</strong> {pesquisadoLeitor.IdLeitor}
            </p>

            <input
              type="hidden"
              name="idLeitor"
              value={pesquisadoLeitor.IdLeitor}
            />

            <input
              type="hidden"
              name="IdentLeitor"
              value={pesquisadoLeitor.Nome}
            />
          </div>
        )}

        <input
          type="date"
          name="Data_Emprestimo"
          defaultValue={
            emprestimo?.DataEmprestimo || new Date().toISOString().split("T")[0]
          }
          className="border rounded-lg px-3 py-1 h-9 w-full"
        />

        <input
          type="date"
          name="Data_Devolucao"
          defaultValue={emprestimo?.DataDevolucao || ""}
          className="border rounded-lg px-3 py-1 h-9 w-full"
        />

        <select
          name="Situacao"
          defaultValue={emprestimo?.Situacao || "RESERVADO"}
          className="border rounded-lg px-3 py-1 h-9 w-full"
        >
          <option value="RESERVADO">Reservado</option>
          <option value="EMPRESTADO">Emprestado</option>
          <option value="DEVOLVIDO">Devolvido</option>
          <option value="ATRASADO">Atrasado</option>
        </select>

        <p className="text-red-500">{estado.message}</p>

        <button
          type="submit"
          disabled={pendente}
          className="btn btn-primary text-white border bg-black p-2 my-2 h-10"
        >
          {pendente
            ? "Salvando..."
            : emprestimo
              ? "Salvar alterações"
              : "Cadastrar Empréstimo"}
        </button>
      </form>
    </div>
  );
}
