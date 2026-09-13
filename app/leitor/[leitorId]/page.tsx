import { getLeitor } from "@/type/Leitores";
import styles from "./pages.module.css";
import { getEmprestimo } from "@/type/Emprestimo";
import Link from "next/link";

export default async function SobreLeitor({
  params,
}: {
  params: { leitorId: string };
}) {
  //pega a nova informação
  const readers = await getLeitor();
  const emprestimo = await getEmprestimo();

  const { leitorId } = await params;

  console.log(leitorId, readers);
  //encontra a skill com id
  const leitor = readers.find((l) => l.IdLeitor === leitorId);
  const emprest = emprestimo.filter((l) => l.leitorId === leitorId);

  //retornamos o objeto renderizado
  console.log("leitor Detail Page . leitor found: ", leitor);
  return leitor ? (
    <article className="max-w-4xl mx-auto p-4 flex  gap-4">
      <div className={styles.apresentacao}>
        <div className={styles.card}>
          <img src={leitor.Imagem} alt="Livro" />
        </div>
      </div>
      <div className={styles.titulo}>
        <h1>{leitor.Nome}</h1>
        <p>Idade: {leitor.Idade}</p>
        <p>Telefone: {leitor.Telefone}</p>
        <div className="overflow-x-auto">
          <table className="table border-none border-separate border-spacing-x-6 border-spacing-y-6">
            <thead>
              <tr>
                <th>Livro</th>
                <th>Data de Expedição</th>
                <th>Data de Devolução</th>
                <th>Situação</th>
              </tr>
            </thead>
            <tbody>
              {emprest.map((emprestimos) => (
                <tr key={emprestimos.IdEmprestimo}>
                  <td>
                    {" "}
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">
                          {emprestimos.livro?.Nome}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{emprestimos.DataEmprestimo}</td>
                  <td>{emprestimos.DataDevolucao}</td>

                  <td>{emprestimos.Situacao}</td>
                  <th>
                    <Link
                      href={`/emprestimo/${emprestimos.IdEmprestimo}`}
                      className="btn btn-ghost btn-xs"
                    >
                      Detalhes
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="pt-11">{leitor.IdLeitor}</p>
    </article>
  ) : (
    <div>Not Found</div>
  );
}
