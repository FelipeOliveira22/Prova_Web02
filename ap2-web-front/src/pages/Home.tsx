import { useState } from "react"
import TableAlunos from "../components/table-alunos"
import { Aluno } from "../types/aluno"

export function Home() {
  const [alunos, setAlunos] = useState<Aluno[]>([])

  function handleSetAlunos(alunos: Aluno[]) {
    setAlunos(alunos)
  }

  return (
    <div className="mt-28 mb-12 flex flex-col px-32">
      <TableAlunos alunos={alunos} setAlunos={handleSetAlunos} />
    </div>
  )
}