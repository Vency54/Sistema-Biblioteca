"use client";

import { useActionState, useEffect, useState } from "react";
import styles from "./components.module.css";

import criarEmprestimo from "@/actions/criarEmprestimo";
import type { Livro } from "@/type/Livro";
import { buscarLivros } from "@/actions/buscarLivro";
import { buscarLeitor } from "@/actions/buscarLeitor";
import type { Leitores } from "@/type/Leitores";

export default function ModalNovoEmprestimo() {
  const [aberto, setAberto] = useState(false);

  const estadoInicial = {
    message: "",
  };
  const [estado, formAction, pendente] = useActionState(
    criarEmprestimo,
    estadoInicial,
  );

  const [livro, setLivro] = useState<string>("");

  const [pesquisado, setPesquisado] = useState<Livro>();

  useEffect(() => {
    async function EntregarLivro() {
      if (livro === "") {
        setPesquisado(undefined);
        return;
      }

      const book = await buscarLivros();

      const encontrado = book.find((l) => l.ISBN === livro || l.Nome === livro);

      setPesquisado(encontrado);
    }

    EntregarLivro();
  }, [livro]);

  const [leitor, setLeitor] = useState<string>("");
  const [pesquisadoLeitor, setPesquisadoLeitor] = useState<Leitores>();

  useEffect(() => {
    async function EntregarLeitor() {
      if (leitor === "") {
        setPesquisadoLeitor(undefined);
        return;
      }

      const reader = await buscarLeitor();

      const encontrado = reader.find(
        (l) => l.IdLeitor === leitor || l.Nome === leitor,
      );

      setPesquisadoLeitor(encontrado);
    }

    EntregarLeitor();
  }, [leitor]);

  return (
    <div>
      <button onClick={() => setAberto(true)}>Novo Emprestimo</button>
      {aberto && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.container}>
              <h2 className="text-gray-800">Novo Emprésitmo</h2>
              <form
                action={formAction}
                className="p-4 max-w-md mx-auto form flex flex-col gap-4 border-black text-gray-800"
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
                    <input
                      type="hidden"
                      name="IdentLivro"
                      value={pesquisado.Nome}
                    />
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
                    <img src={pesquisadoLeitor.Imagem} alt="" />
                    <p>{pesquisadoLeitor.Nome}</p>
                    <p>{pesquisadoLeitor.Idade}</p>
                    <p>{pesquisadoLeitor.IdLeitor}</p>
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
                  </>
                )}
                <input
                  type="Date"
                  name="Data_Emprestimo"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
                />
                <input
                  type="Date"
                  name="Data_Devolucao"
                  className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
                />
                <select
                  name="Situacao"
                  className="border rounded-lg  px-3 py-1 h-9 w-83 gap-2 "
                >
                  <option value="RESERVADO">Reservado</option>
                  <option value="EMPRESTADO">Emprestado</option>
                  <option value="DEVOLVIDO">Devolvido</option>
                  <option value="ATRASADO">Atrasado</option>
                </select>
                <p className="text-red-500">{estado.message}</p>
                <button
                  className="btn btn-primary text-white border bg-black p-2 my-2 h-10"
                  disabled={pendente}
                >
                  {pendente ? "Cadastrando..." : "Cadastrar Empréstimo"}
                </button>
              </form>
              <button className="text-red-500" onClick={() => setAberto(false)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
}
