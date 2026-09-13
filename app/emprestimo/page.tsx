import { getEmprestimo } from "@/type/Emprestimo";
import Link from "next/link";
import styles from "./emprestimo.module.css";
import Situacao from "@/components/SelectSituation";
import BotaoRemover from "@/components/BotaoRemover";
import RemoverEmprestimo from "@/actions/RemoverEmprestimo";
export default async function Emprestimo() {
  const emprestimo = await getEmprestimo();

  return (
    <section className={styles.container}>
      <div className={styles.rodape}>
        <h1>Lista de Emprestimos</h1>
        <div className={styles.Adicionar}>
          <Link className={styles.TextoAdd} href={"/emprestimo/novo"}>
            Novo Emprestimo
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table border-none border-separate border-spacing-x-6 border-spacing-y-6">
          {/* head */}
          <thead>
            <tr>
              <th>Livro</th>
              <th>Leitor</th>
              <th>Prazo Inicial</th>
              <th>Prazo Final</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {emprestimo.map((emprestimos) => (
              <tr key={emprestimos.IdEmprestimo}>
                <td>
                  {" "}
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{emprestimos.livro?.Nome}</div>

                      <div className="text-sm opacity-50">
                        {emprestimos.ISBN}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">
                        {emprestimos.leitor?.Nome}
                      </div>
                      <div className="text-sm opacity-50">
                        {emprestimos.leitor?.Email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{emprestimos.DataEmprestimo}</td>
                <td>{emprestimos.DataDevolucao}</td>
                <td>
                  <Situacao
                    id={emprestimos.IdEmprestimo}
                    situacao={emprestimos.Situacao}
                  />
                </td>
                <th>
                  <Link href={`/emprestimo/${emprestimos.IdEmprestimo}`}>
                    Editar
                  </Link>
                </th>
                <th>
                  <BotaoRemover
                    id={emprestimos.IdEmprestimo}
                    onClick={RemoverEmprestimo}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
