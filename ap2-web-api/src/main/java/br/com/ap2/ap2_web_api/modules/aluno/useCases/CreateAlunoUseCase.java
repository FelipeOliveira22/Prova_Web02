package br.com.ap2.ap2_web_api.modules.aluno.useCases;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.ap2.ap2_web_api.modules.aluno.entity.AlunoEntity;
import br.com.ap2.ap2_web_api.modules.aluno.repository.AlunoRepository;

@Service
public class CreateAlunoUseCase {
  
  @Autowired
  private AlunoRepository alunoRepository;

  public AlunoEntity execute(AlunoEntity alunoEntity) {
    var aluno = this.alunoRepository.save(alunoEntity);

    return aluno;
  }

}
