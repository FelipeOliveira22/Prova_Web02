import { useState } from "react";
import { Header } from "./components/header";
import TableAlunos from "./components/table-alunos";
import { Aluno } from "./types/aluno";



export function App() {
  const [alunos, setAlunos] = useState<Aluno[]>([])

  function handleSetAlunos(alunos: Aluno[]) {
    setAlunos(alunos)
  }

  return (
    <div>
      <Header />
      <TableAlunos alunos={alunos} setAlunos={handleSetAlunos} />

    </div>
  )
}
