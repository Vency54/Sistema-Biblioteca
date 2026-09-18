"use client";

import { Emprestimo } from "@/type/Emprestimo";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  emprestimo: Emprestimo[];
};

export default function Grafico({ emprestimo }: Props) {
  let qtdeReservado = emprestimo.filter(
    (e) => e.Situacao === "RESERVADO",
  ).length;

  let qtdeEmprestado = emprestimo.filter(
    (e) => e.Situacao === "EMPRESTADO",
  ).length;

  let qtdeAtrasado = emprestimo.filter((e) => e.Situacao === "ATRASADO").length;

  let qtdeDevolvido = emprestimo.filter(
    (e) => e.Situacao === "DEVOLVIDO",
  ).length;

  const dados = [
    {
      nome: "Reservado",
      quantidade: qtdeReservado,
    },
    {
      nome: "Emprestado",
      quantidade: qtdeEmprestado,
    },
    {
      nome: "Atrasado",
      quantidade: qtdeAtrasado,
    },
    {
      nome: "Devolvido",
      quantidade: qtdeDevolvido,
    },
  ];

  return (
    <div style={{ width: "100%", height: 300, minWidth: 500 }}>
      <ResponsiveContainer>
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantidade" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
