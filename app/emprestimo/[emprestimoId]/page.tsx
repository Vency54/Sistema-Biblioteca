import FormularioEmprestimo from "@/components/FormularioEmprestimo";

import { getEmprestimo } from "@/type/Emprestimo";

export default async function EditarLivro({
  params,
}: {
  params: Promise<{ emprestimoId: string }>;
}) {
  const { emprestimoId } = await params;

  const emprestimos = await getEmprestimo();

  const emprestimo = emprestimos.find((l) => l.IdEmprestimo === emprestimoId);

  if (!emprestimo) {
    return <div>Emprestimo não encontrado</div>;
  }

  return (
    <div>
      <h1>Alterar Emprestimo</h1>

      <FormularioEmprestimo emprestimo={emprestimo} />
    </div>
  );
}
