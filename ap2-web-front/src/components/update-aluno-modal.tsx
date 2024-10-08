import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, TextField, Button } from '@mui/material';
import { api } from '../lib/axios';

interface Aluno {
  id: string;
  nome: string;
  curso: string;
  ira: number;
}

interface UpdateAlunoModalProps {
  state: boolean;
  handleCloseModal: () => void;
  setAluno: (aluno: Aluno) => void;
  aluno: Aluno; // Recebendo o aluno como props
}

// Definindo o schema de validação com Zod
const alunoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  curso: z.string().min(1, "Curso é obrigatório"),
  ira: z.number().min(0, "IRA deve ser um número não negativo").max(10, "IRA deve ser no máximo 10")
});

type AlunoFormInputs = z.infer<typeof alunoSchema>;

export default function UpdateAlunoModal({ state, handleCloseModal, aluno, setAluno }: UpdateAlunoModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AlunoFormInputs>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      nome: aluno.nome,  // Preenchendo os valores iniciais
      curso: aluno.curso,
      ira: aluno.ira,
    }
  });

  async function handleUpdateAluno (data: AlunoFormInputs) {
    await api.put("/aluno/", { // Usando o ID do aluno para atualização
      id: aluno.id,
      nome: data.nome,
      curso: data.curso,
      ira: data.ira,
    });

    const newAluno = {
      id: aluno.id,
      nome: data.nome,
      curso: data.curso,
      ira: data.ira,
    } 

    setAluno(newAluno)

    reset();
    
    handleCloseModal();
  }

  return (
    <Modal
      open={state}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white shadow-lg p-6 rounded">
        <h2 id="modal-modal-title" className="text-xl font-semibold">
          Atualizar Aluno
        </h2>

        <form onSubmit={handleSubmit(handleUpdateAluno)} className="space-y-4 mt-4">
          <TextField
            fullWidth
            label="Nome"
            {...register('nome')}
            error={!!errors.nome}
            helperText={errors.nome?.message}
          />
          <TextField
            fullWidth
            label="Curso"
            {...register('curso')}
            error={!!errors.curso}
            helperText={errors.curso?.message}
          />
          <TextField
            fullWidth
            label="IRA"
            type="number"
            {...register('ira', { valueAsNumber: true })}
            error={!!errors.ira}
            helperText={errors.ira?.message}
          />

          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={handleCloseModal} variant="contained" size="small">Cancelar</Button>
            <Button type="submit" variant="contained" color="primary" size="small">Salvar</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
