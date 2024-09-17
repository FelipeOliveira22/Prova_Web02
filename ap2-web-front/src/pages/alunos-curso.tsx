import { useState } from "react"
import TableAlunosPorCurso from "../components/table-alunos-curso"
import { Aluno } from "../types/aluno"

export function AlunosCurso() {
  const [alunos, setAlunos] = useState<Aluno[]>([])

  function handleSetAlunos(alunos: Aluno[]) {
    setAlunos(alunos)
  }

  return (
    <div className="mt-20 mb-12 flex flex-col px-32">
      
      <h2 className="mb-10 text-2xl font-semibold text-zinc-950">Alunos por curso</h2>
      <TableAlunosPorCurso alunos={alunos} setAlunos={handleSetAlunos} />
    </div>
  )
}