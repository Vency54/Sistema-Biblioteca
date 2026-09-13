import { getLeitor } from "@/type/Leitores";
import Link from "next/link";
import styles from "./leitores.module.css";
import BotaoRemover from "@/components/BotaoRemover";
import RemoverLeitor from "@/actions/RemoverLeitor";
export default async function Leitor() {
  const leitor = await getLeitor();

  return (
    <section className={styles.container}>
      <div className={styles.rodape}>
        <h1>Lista de Leitores</h1>
        <div className={styles.Adicionar}>
          <Link className={styles.TextoAdd} href={"/leitor/novo"}>
            Novo Leitor
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table border-none border-separate border-spacing-x-6 border-spacing-y-6">
          {/* head */}
          <thead>
            <tr>
              <th>Leitor</th>
              <th>id</th>
              <th>Contato</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {leitor.map((leitores) => (
              <tr key={leitores.IdLeitor}>
                <td>
                  {" "}
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-16 shrink-0">
                        <img
                          src={leitores.Imagem}
                          alt="Leitor"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="font-bold">{leitores.Nome}</div>

                      <div className="text-sm opacity-50">{leitores.Idade}</div>
                    </div>
                  </div>
                </td>
                <td>{leitores.IdLeitor}</td>
                <td>{leitores.Telefone}</td>
                <td>{leitores.Email}</td>
                <th>
                  <Link
                    href={`/leitor/${leitores.IdLeitor}`}
                    className="btn btn-ghost btn-xs"
                  >
                    Detalhes
                  </Link>
                </th>
                <th>
                  <BotaoRemover
                    id={leitores.IdLeitor}
                    onClick={RemoverLeitor}
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
