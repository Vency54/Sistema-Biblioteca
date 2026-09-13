import { getLivros } from "@/type/Livro";
import styles from "./page.module.css";

import Modal from "@/components/modal";

export default async function SobreLivro({
  params,
}: {
  params: { livroId: string };
}) {
  //pega a nova informação
  const books = await getLivros();

  const { livroId } = await params;

  console.log(livroId, books);
  //encontra a skill com id
  const book = books.find((livreto) => livreto.ISBN === livroId);

  //retornamos o objeto renderizado
  console.log("Books Detail Page . Book found: ", book);
  return book ? (
    <article className="mmax-w-4xl mx-auto p-4 flex  gap-4">
      <div className={styles.apresentacao}>
        <div className={styles.card}>
          <img src={book.Imagem} alt="Livro" />
        </div>
        <p>Em estoque: {book.Quantidade}</p>
      </div>
      <div className={styles.titulo}>
        <h1>{book.Nome}</h1>
        <p>{book.Autor}</p>
        <p>{book.Ano}</p>
        <p>{book.Genero}</p>
        <div className={styles.caixa}>
          <p>{book.Sinopse}</p>
        </div>
      </div>
      <p className="pt-11">{book.ISBN}</p>
      <div className={styles.Editar}>
        <Modal livro={book} />
      </div>
    </article>
  ) : (
    <div>Not Found</div>
  );
}
