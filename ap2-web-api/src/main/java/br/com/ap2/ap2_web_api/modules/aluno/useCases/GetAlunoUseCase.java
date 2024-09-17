package br.com.ap2.ap2_web_api.modules.aluno.useCases;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.ap2.ap2_web_api.modules.aluno.entity.AlunoEntity;
import br.com.ap2.ap2_web_api.modules.aluno.repository.AlunoRepository;

@Service
public class GetAlunoUseCase {
  @Autowired
  private AlunoRepository alunoRepository;

  public Optional<AlunoEntity> execute(UUID id) {
    var aluno = this.alunoRepository.findById(id);

    return aluno;
  }
}
