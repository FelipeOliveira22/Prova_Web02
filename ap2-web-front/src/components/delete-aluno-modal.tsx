import { Button, Modal } from "@mui/material";
import { api } from "../lib/axios";

interface DeleteAlunoModalProps {
  state: boolean
  id: string
  handleCloseModal: () => void
  filterAlunos: (deletedId: string) => void
}



export default function DeleteAlunoModal({ state, handleCloseModal, id, filterAlunos }: DeleteAlunoModalProps) {
  async function deleteAluno() {
    await api.delete(`/aluno/${id}`)
    handleCloseModal()
    filterAlunos(id)
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
          Deseja excluir o aluno?
        </h2>

        <div className="flex justify-end mt-8 gap-2">
          <Button onClick={handleCloseModal} variant="contained" size="small">Cancelar</Button>
          <Button onClick={() => deleteAluno()} variant="contained" color="error" size="small">Confirmar</Button>
        </div>

      </div>
    </Modal>
  )
}