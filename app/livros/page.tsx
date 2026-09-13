import Disponivel from "@/components/numberbox";
import { getLivros, removerLivro } from "@/type/Livro";
import Link from "next/link";
import styles from "./livros.module.css";
import RemoverLivro from "@/actions/RemoverLivro";
import BotaoRemover from "@/components/BotaoRemover";
export default async function Livros() {
  const book = await getLivros();

  return (
    <section className={styles.container}>
      <div className={styles.rodape}>
        <h1>Lista Livros</h1>
        <div className={styles.Adicionar}>
          <Link className={styles.TextoAdd} href={"/livros/novo"}>
            Novo Livro
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table border-none border-separate border-spacing-x-6 border-spacing-y-6">
          {/* head */}
          <thead>
            <tr>
              <th>Livro</th>
              <th>Gênero</th>
              <th>Disponivel</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {book.map((books) => (
              <tr key={books.ISBN}>
                <td>
                  {" "}
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-16 shrink-0">
                        {books.Imagem && (
                          <img
                            src={
                              typeof books.Imagem === "string"
                                ? books.Imagem
                                : URL.createObjectURL(books.Imagem)
                            }
                            alt={books.Nome}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="font-bold">{books.Nome}</div>

                      <div className="text-sm opacity-50">{books.Autor}</div>
                    </div>
                  </div>
                </td>
                <td>{books.Genero}</td>
                <td>
                  <Disponivel
                    ISBN={books.ISBN}
                    quantidade={Number(books.Quantidade)}
                  />
                </td>
                <th>
                  <Link
                    href={`/livros/${books.ISBN}`}
                    className="btn btn-ghost btn-xs"
                  >
                    Detalhes
                  </Link>
                </th>
                <th>
                  <BotaoRemover id={books.ISBN} onClick={RemoverLivro} />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
