import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, TextField, Button } from '@mui/material';
import { api } from '../lib/axios';

interface CreateAlunoModalProps {
  open: boolean, 
  handleCloseModal: () => void, 
}

// Definindo o schema de validação com Zod
const alunoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  curso: z
    .enum(["ES", "EC", "CC", "DD", "RD", "SI", "es", "ec", "cc", "dd", "rd", "si"])
    .transform((value) => value.toUpperCase()), // Apenas transforma para maiúsculas
  ira: z.number().min(0, "IRA deve ser um número não negativo").max(10, "IRA deve ser no máximo 10"),
});


type AlunoFormInputs = z.infer<typeof alunoSchema>;

export default function CreateAlunoModal({ open, handleCloseModal }: CreateAlunoModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AlunoFormInputs>({
    resolver: zodResolver(alunoSchema)
  });

  async function handleCreateAluno (data: AlunoFormInputs) {
    await api.post("/aluno/", {
      "nome": data.nome, 
      "curso": data.curso, 
      "ira": data.ira, 
    })

    reset()
    handleCloseModal()
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white shadow-lg p-6 rounded">
        <h2 id="modal-modal-title" className="text-xl font-semibold">
          Adicionar Aluno
        </h2>

        <form onSubmit={handleSubmit(handleCreateAluno)} className="space-y-4 mt-4">
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
            helperText={!!errors.curso && "Digite apenas a sigla do curso e válida(ES, EC, CC, DD, SI, RD)"}
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
