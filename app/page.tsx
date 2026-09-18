"use server";
import styles from "./paginaInicial.module.css";
import { getLivros } from "@/type/Livro";
import { getLeitor } from "@/type/Leitores";
import { getEmprestimo } from "@/type/Emprestimo";
import Grafico from "@/components/graficoSituacao";
import Contador from "@/components/ContadorTabelas";

export const dynamic = "force-dynamic";

export default async function Home() {
  const livros = await getLivros();
  const leitores = await getLeitor();
  const emprestimo = await getEmprestimo();

  return (
    <div className={styles.Container}>
      <div className={styles.Titulo}>
        <h1>Bem Vindo a Biblioteca Acervo+</h1>
        <p>O maior acervo de literatura do brasil!</p>
      </div>
      <div className={styles.Dashboard}>
        <h2>Dashboard</h2>
        <div className={styles.CardRow}>
          <div className={styles.Card}>
            <h3>Livros</h3>
            <p>
              {" "}
              <Contador element={livros} />
            </p>
          </div>
          <div className={styles.Card}>
            <h3>Leitores</h3>
            <p>
              <Contador element={leitores} />
            </p>
          </div>
          <div className={styles.Card}>
            <h3>Empréstimos</h3>
            <p>
              <Contador element={emprestimo} />
            </p>
          </div>
        </div>
        <Grafico emprestimo={emprestimo} />
      </div>
    </div>
  );
}
