"use client";
import criarEmprestimo from "@/actions/criarEmprestimo";
import { getLeitor, Leitores } from "@/type/Leitores";
import { getLivros, Livro } from "@/type/Livro";
import { useActionState, useEffect, useState } from "react";
import styles from "./novo.module.css";

const estadoInicial = {
  message: "",
};

export default function NovoEmprestimo() {
  const [estado, formAction, pendente] = useActionState(
    criarEmprestimo,
    estadoInicial,
  );

  const [livro, setLivro] = useState<string>("");

  const [pesquisado, setPesquisado] = useState<Livro>();

  useEffect(() => {
    async function PesquisarLivro(livro: string) {
      let book = await getLivros();

      const pesquisar = book.find((l) => l.ISBN === livro || l.Nome === livro);

      return pesquisar;
    }
    async function EntregarLivro() {
      let entregue = await PesquisarLivro(livro);
      return setPesquisado(entregue);
    }
    // 1. Busca imediatamente ao digitar ou carregar
    EntregarLivro();
  }, [livro]);

  useEffect(() => {
    async function atualizarLivro() {
      const livros = await getLivros();

      const encontrado = livros.find(
        (l) => l.ISBN === livro || l.Nome === livro,
      );

      setPesquisado(encontrado);
    }

    atualizarLivro();

    const intervalo = setInterval(atualizarLivro, 3000);

    return () => clearInterval(intervalo);
  }, [livro]);

  const [leitor, setLeitor] = useState<string>("");
  const [pesquisadoLeitor, setPesquisadoLeitor] = useState<Leitores>();

  async function PesquisarLeitor(leitor: string) {
    const reader = await getLeitor();

    const pesquisar = reader.find((l) => l.id === leitor || l.Nome === leitor);

    return pesquisar;
  }

  useEffect(() => {
    async function EntregarLeitor() {
      let encontrado = await PesquisarLeitor(leitor);
      return setPesquisadoLeitor(encontrado);
    }
    EntregarLeitor();
  }, [leitor]);

  return (
    <div>
      <form
        action={formAction}
        className="p-4 max-w-md mx-auto form flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Escreva o nome ou ISBN do Livro"
          className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
          onChange={(e) => setLivro(e.target.value)}
        />
        {pesquisado != undefined && (
          <div className={styles.card}>
            <img src={pesquisado.Imagem} alt="" />
            <div className={styles.titulo}>
              <h2>{pesquisado.Nome}</h2>
              <p>{pesquisado.Autor}</p>
            </div>
            {pesquisado.Quantidade != "0" ? (
              <div className={styles.estoque}>
                <p>Em estoque:</p>
                <p>{pesquisado.Quantidade}</p>
              </div>
            ) : (
              <div className={styles.estoque}>
                <p className="red">Fora de Estoque</p>
              </div>
            )}

            <input type="hidden" name="ISBN" value={pesquisado.ISBN} />
            <input type="hidden" name="IdentLivro" value={pesquisado.Nome} />
          </div>
        )}
        <input
          type="text"
          placeholder="Escreva o nome ou ID do Leitor"
          className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
          onChange={(e) => setLeitor(e.target.value)}
        />
        {pesquisadoLeitor != undefined && (
          <>
            <p>{pesquisadoLeitor.Nome}</p>
            <p>{pesquisadoLeitor.Idade}</p>
            <p>{pesquisadoLeitor.id}</p>
            <input type="hidden" name="idLeitor" value={pesquisadoLeitor.id} />
            <input
              type="hidden"
              name="IdentLeitor"
              value={pesquisadoLeitor.Nome}
            />
          </>
        )}
        <input
          type="Date"
          name="Prazo_Inicial"
          defaultValue={new Date().toISOString().split("T")[0]}
          className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
        />
        <input
          type="Date"
          name="Prazo_Final"
          className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
        />
        <select
          name="Situacao"
          className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
        >
          <option value="Reservado">Reservado</option>
          <option value="Emprestado">Emprestado</option>
          <option value="Entregue">Entregue</option>
          <option value="Atrasado">Atrasado</option>
        </select>
        <p className="text-red-500">{estado.message}</p>
        <button
          className="btn btn-primary text-white border bg-black p-2 my-2 h-10"
          disabled={pendente}
        >
          {pendente ? "Cadastrando..." : "Cadastrar Empréstimo"}
        </button>
      </form>
    </div>
  );
}
