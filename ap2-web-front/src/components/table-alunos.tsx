import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'; // Importando o Button
import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/axios';
import DeleteAlunoModal from './delete-aluno-modal';
import { Aluno } from '../types/aluno';
import UpdateAlunoModal from './update-aluno-modal';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@mui/material/TextField';

interface TableAlunosProps {
  alunos: Aluno[]
  setAlunos: (alunos: Aluno[]) => void
}

// Schema de validação usando Zod
const searchSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório")
});

type SearchFormInputs = z.infer<typeof searchSchema>;

export default function TableAlunos({ alunos, setAlunos }: TableAlunosProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  // Hook do React Hook Form para o formulário de pesquisa
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchSchema)
  });

  // Função para buscar todos os alunos
  const getAllAlunos = useCallback(async () => {
    try {
      const response = await api.get("/aluno/");
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  }, [setAlunos]);

  // Função para buscar alunos pelo nome
  const searchAlunoByName = useCallback(async (data: SearchFormInputs) => {
    try {
      const response = await api.get(`/aluno?nome=${data.nome}`);
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao buscar aluno pelo nome:", error);
    }
    reset();
  }, [setAlunos, reset]);

  function filterAlunos(deletedId: string) {
    setAlunos(alunos.filter(aluno => aluno.id !== deletedId))
  }

  useEffect(() => {
    getAllAlunos()
  }, [getAllAlunos])

  return (
    <div className="mt-20 flex flex-col px-32 space-y-9">

      {/* Formulário de Pesquisa */}
      <form onSubmit={handleSubmit(searchAlunoByName)} className="flex items-center gap-4 mb-6">
        <TextField
          fullWidth
          label="Pesquisar por Nome"
          {...register('nome')}
          error={!!errors.nome}
          helperText={errors.nome?.message}
        />
        <Button type="submit" variant="contained" color="primary">Pesquisar</Button>
      </form>

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
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
                    onClick={handleOpenUpdateModal}
                    style={{ marginRight: '10px' }}
                  >
                    Editar
                  </Button>
                  {/* Botão para deletar o aluno */}
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={handleOpenDeleteModal}
                  >
                    Excluir
                  </Button>
                </TableCell>

                <DeleteAlunoModal state={openDeleteModal} handleCloseModal={handleCloseDeleteModal} id={aluno.id} filterAlunos={filterAlunos} />
                <UpdateAlunoModal state={openUpdateModal} handleCloseModal={handleCloseUpdateModal} aluno={aluno} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
