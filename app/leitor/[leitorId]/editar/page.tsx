import FormularioLeitor from "@/components/FormularioLeitor";
import { getLeitor } from "@/type/Leitores";
import { getLivros } from "@/type/Livro";

export default async function EditarLivro({
  params,
}: {
  params: Promise<{ leitorId: string }>;
}) {
  const { leitorId } = await params;

  const leitores = await getLeitor();

  const leitor = leitores.find((l) => l.IdLeitor === leitorId);

  if (!leitor) {
    return <div>Leitor não encontrado</div>;
  }

  return (
    <div>
      <h1>Alterar Leitor</h1>

      <FormularioLeitor leitor={leitor} />
    </div>
  );
}
