import { getEmprestimo } from "@/type/Emprestimo";
import { getLeitor } from "@/type/Leitores";
import { getLivros, Livro } from "@/type/Livro";
import Link from "next/link";

export default async function SobreEmprest({
  params,
}: {
  params: { emprestimoId: string };
}) {
  //pega a nova informação
  const loans = await getEmprestimo();
  const book = await getLivros();
  const reader = await getLeitor();

  const { emprestimoId } = await params;

  console.log(emprestimoId, loans);
  //encontra a skill com id
  const emprestimo = loans.find((e) => e.id === emprestimoId);

  const livro = emprestimo
    ? book.find((b) => b.ISBN === emprestimo.ISBN)
    : undefined;

  const leitor = emprestimo
    ? reader.find((r) => r.id === emprestimo.idLeitor)
    : undefined;

  //retornamos o objeto renderizado
  console.log("emprestimo Detail Page . emprestimo found: ", emprestimo);
  return emprestimo ? (
    <article className="max-w-md mx-auto p-4 flex flex-col gap-4">
      <h1>{emprestimo.id}</h1>
      {livro && (
        <Link href={`/livros/${livro.id}`}>{emprestimo.NomeLivro}</Link>
      )}
      {leitor && (
        <Link href={`/leitor/${leitor.id}`}>{emprestimo.NomeLeitor}</Link>
      )}
      <h1>{emprestimo.Data_Expedicao}</h1>
      <h1>{emprestimo.Data_Devolucao}</h1>
    </article>
  ) : (
    <div>Not Found</div>
  );
}
