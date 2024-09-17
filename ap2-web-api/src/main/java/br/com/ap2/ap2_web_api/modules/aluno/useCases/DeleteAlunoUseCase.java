package br.com.ap2.ap2_web_api.modules.aluno.useCases;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.ap2.ap2_web_api.modules.aluno.repository.AlunoRepository;

@Service
public class DeleteAlunoUseCase {
  
  @Autowired
  private AlunoRepository alunoRepository;

  public void execute(UUID id) {
    this.alunoRepository.deleteById(id);
  }
}
