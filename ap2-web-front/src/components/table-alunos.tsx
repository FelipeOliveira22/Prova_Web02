import Button from '@mui/material/Button'; // Importando o Button
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { Aluno } from '../types/aluno';
import DeleteAlunoModal from './delete-aluno-modal';
import UpdateAlunoModal from './update-aluno-modal';

interface TableAlunosProps {
  alunos: Aluno[]
  setAlunos: (alunos: Aluno[]) => void
}

export default function TableAlunos({ alunos, setAlunos }: TableAlunosProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [media, setMedia] = useState(0);
  const [pintarAlunos, setPintarAlunos] = useState(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  const handleOpenDeleteModal = (aluno: Aluno) => {
    setSelectedAluno(aluno); // Define o aluno a ser excluído
    setOpenDeleteModal(true);
  };

  const handleOpenUpdateModal = (aluno: Aluno) => {
    setSelectedAluno(aluno); // Define o aluno a ser editado
    setOpenUpdateModal(true);
  };

  // Função para buscar todos os alunos
  const getAllAlunos = useCallback(async () => {
    try {
      const response = await api.get("/aluno/");
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  }, [setAlunos]);


  function filterAlunos(deletedId: string) {
    setAlunos(alunos.filter(aluno => aluno.id !== deletedId))
  }

  function handlePintarAlunos() {
    setPintarAlunos(!pintarAlunos)
  }

  function setAluno(updatedAluno: Aluno) {
    // Encontrar o índice do aluno que será atualizado
    const alunoIndex = alunos.findIndex(aluno => aluno.id === updatedAluno.id);

    // Se o aluno for encontrado na lista
    if (alunoIndex !== -1) {
      // Criar uma nova lista de alunos com o aluno atualizado
      const updatedAlunos = [...alunos];

      updatedAlunos[alunoIndex] = updatedAluno;

      // Atualizar o estado com a nova lista de alunos
      setAlunos(updatedAlunos);
    }
  }

  const getMedia = useCallback(() => {
    let total = 0;

    alunos.map(aluno => {
      total = total + aluno.ira
    })

    const media = total / alunos.length;

    setMedia(media)
  }, [alunos])

  useEffect(() => {
    getAllAlunos()
    getMedia()
  }, [getAllAlunos, getMedia])

  return (
    <div className=" space-y-9">

      <div className='w-full flex justify-end'>
        <Button type="submit" variant="contained" color="secondary" onClick={handlePintarAlunos}>
          {pintarAlunos ? <span>Descolorir</span> : <span>Pintar</span>}
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Curso</TableCell>
              <TableCell align="right">IRA</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alunos.map((aluno) => (
              <TableRow
                key={aluno.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: pintarAlunos
                    ? aluno.ira > media
                      ? '#ADD8E6' // Azul claro se o IRA for maior que a média
                      : '#FFCCCB' // Vermelho claro se o IRA for menor que a média
                    : 'inherit', // Cor padrão se `pintarAlunos` for false
                }}
              >
                <TableCell component="th" scope="row">
                  {aluno.nome}
                </TableCell>
                <TableCell align="right">{aluno.curso}</TableCell>
                <TableCell align="right">{aluno.ira}</TableCell>
                <TableCell align="right">
                  {/* Botão para editar o aluno */}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenUpdateModal(aluno)} // Abrir modal de edição
                    style={{ marginRight: '10px' }}
                  >
                    Editar
                  </Button>
                  {/* Botão para deletar o aluno */}
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => handleOpenDeleteModal(aluno)} // Abrir modal de exclusão
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableCell colSpan={2}> {/* ColSpan ajusta para 2 colunas ou o número necessário */}
            <strong>Média</strong>: {media.toFixed(2)}
            </TableCell>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de exclusão, renderizado fora do loop */}
      {selectedAluno && (
        <DeleteAlunoModal
          state={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          id={selectedAluno.id}
          filterAlunos={filterAlunos}
        />
      )}

      {/* Modal de edição, renderizado fora do loop */}
      {selectedAluno && (
        <UpdateAlunoModal
          state={openUpdateModal}
          handleCloseModal={handleCloseUpdateModal}
          aluno={selectedAluno}
          setAluno={setAluno}
        />
      )}
    </div>
  );
}
