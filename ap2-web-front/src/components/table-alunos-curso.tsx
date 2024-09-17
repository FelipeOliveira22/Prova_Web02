import Button from '@mui/material/Button'; // Importando o Button
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { Aluno } from '../types/aluno';

interface TableAlunosPorCursoProps {
  alunos: Aluno[]
  setAlunos: (alunos: Aluno[]) => void
}


export default function TableAlunosPorCurso({ alunos, setAlunos }: TableAlunosPorCursoProps) {

  const [pintarAlunos, setPintarAlunos] = useState(false);

  function handlePintarAlunos() {
    setPintarAlunos(!pintarAlunos)
  }


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
  

  useEffect(() => {
    getAllAlunos()
  }, [getAllAlunos])

  return (
    <div className=" space-y-9">

      <div className='w-full flex justify-end'>
        <Button type="submit" variant="contained" color="secondary" onClick={handlePintarAlunos}>
          {pintarAlunos ? <span>Descolorir</span> : <span>Pintar alunos com IRA acima de 7</span>}
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {/* Engenharia de Computação */}
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#aeaeae' }}>
              <TableCell component="th" colSpan={4} scope="row">
                Engenharia de Computação
              </TableCell>
            </TableRow>

            {/* Filtro e exibição de alunos de Engenharia de Computação */}
            {alunos.filter(aluno => aluno.curso === "EC").length > 0 ? (
              alunos.filter(aluno => aluno.curso === "EC").map(aluno => (
                <TableRow key={aluno.id} sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: pintarAlunos ? aluno.ira >= 7 ? '#90EE90' : 'inherit' : 'inherit' // Verde claro se o IRA for maior que 7
                }}>
                  <TableCell component="th" scope="row">{aluno.nome}</TableCell>
                  <TableCell component="th" scope="row">IRA:</TableCell>
                  <TableCell align="right">{aluno.ira}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>Não há alunos para esse curso</TableCell>
              </TableRow>
            )}

            {/* Ciência da Computação */}
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#aeaeae' }}>
              <TableCell component="th" colSpan={4} scope="row">
                Ciência da Computação
              </TableCell>
            </TableRow>

            {/* Filtro e exibição de alunos de Ciência da Computação */}
            {alunos.filter(aluno => aluno.curso === "CC").length > 0 ? (
              alunos.filter(aluno => aluno.curso === "CC").map(aluno => (
                <TableRow key={aluno.id} sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: pintarAlunos ? aluno.ira >= 7 ? '#90EE90' : 'inherit' : 'inherit' // Verde claro se o IRA for maior que 7
                }}>
                  <TableCell component="th" scope="row">{aluno.nome}</TableCell>
                  <TableCell component="th" scope="row">IRA:</TableCell>
                  <TableCell align="right">{aluno.ira}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>Não há alunos para esse curso</TableCell>
              </TableRow>
            )}

            {/* Engenharia de Software */}
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#aeaeae' }}>
              <TableCell component="th" colSpan={4} scope="row">
                Engenharia de Software
              </TableCell>
            </TableRow>

            {/* Filtro e exibição de alunos de Engenharia de Software */}
            {alunos.filter(aluno => aluno.curso === "ES").length > 0 ? (
              alunos.filter(aluno => aluno.curso === "ES").map(aluno => (
                <TableRow key={aluno.id} sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: pintarAlunos ? aluno.ira >= 7 ? '#90EE90' : 'inherit' : 'inherit' // Verde claro se o IRA for maior que 7
                }}>
                  <TableCell component="th" scope="row">{aluno.nome}</TableCell>
                  <TableCell component="th" scope="row">IRA:</TableCell>
                  <TableCell align="right">{aluno.ira}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>Não há alunos para esse curso</TableCell>
              </TableRow>
            )}

            {/* Sistemas de Informação */}
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#aeaeae' }}>
              <TableCell component="th" colSpan={4} scope="row">
                Sistemas de Informação
              </TableCell>
            </TableRow>

            {/* Filtro e exibição de alunos de Sistemas de Informação */}
            {alunos.filter(aluno => aluno.curso === "SI").length > 0 ? (
              alunos.filter(aluno => aluno.curso === "SI").map(aluno => (
                <TableRow key={aluno.id} sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: pintarAlunos ? aluno.ira >= 7 ? '#90EE90' : 'inherit' : 'inherit' // Verde claro se o IRA for maior que 7
                }}>
                  <TableCell component="th" scope="row">{aluno.nome}</TableCell>
                  <TableCell component="th" scope="row">IRA:</TableCell>
                  <TableCell align="right">{aluno.ira}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>Não há alunos para esse curso</TableCell>
              </TableRow>
            )}

            {/* Redes de Computadores */}
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#aeaeae' }}>
              <TableCell component="th" colSpan={4} scope="row">
                Redes de Computadores
              </TableCell>
            </TableRow>

            {/* Filtro e exibição de alunos de Redes de Computadores */}
            {alunos.filter(aluno => aluno.curso === "RC").length > 0 ? (
              alunos.filter(aluno => aluno.curso === "RC").map(aluno => (
                <TableRow key={aluno.id} sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: pintarAlunos ? aluno.ira >= 7 ? '#90EE90' : 'inherit' : 'inherit' // Verde claro se o IRA for maior que 7
                }}>
                  <TableCell component="th" scope="row">{aluno.nome}</TableCell>
                  <TableCell component="th" scope="row">IRA:</TableCell>
                  <TableCell align="right">{aluno.ira}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>Não há alunos para esse curso</TableCell>
              </TableRow>
            )}

            {/* Design Digital */}
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: '#aeaeae' }}>
              <TableCell component="th" colSpan={4} scope="row">
                Design Digital
              </TableCell>
            </TableRow>

            {/* Filtro e exibição de alunos de Design Digital */}
            {alunos.filter(aluno => aluno.curso === "DD").length > 0 ? (
              alunos.filter(aluno => aluno.curso === "DD").map(aluno => (
                <TableRow key={aluno.id} sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: pintarAlunos ? aluno.ira >= 7 ? '#90EE90' : 'inherit' : 'inherit' // Verde claro se o IRA for maior que 7
                }}>
                  <TableCell component="th" scope="row">{aluno.nome}</TableCell>
                  <TableCell component="th" scope="row">IRA:</TableCell>
                  <TableCell align="right">{aluno.ira}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>Não há alunos para esse curso</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>


    </div>
  );
}
