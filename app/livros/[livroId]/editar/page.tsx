import FormularioLivro from "@/components/FormularioLivro";
import { getLivros } from "@/type/Livro";

export default async function EditarLivro({
  params,
}: {
  params: Promise<{ livroId: string }>;
}) {
  const { livroId } = await params;

  const livros = await getLivros();

  const livro = livros.find((livro) => livro.ISBN === livroId);

  if (!livro) {
    return <div>Livro não encontrado</div>;
  }

  return (
    <div>
      <h1>Alterar Livro</h1>

      <FormularioLivro livro={livro} />
    </div>
  );
}
