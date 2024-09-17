package br.com.ap2.ap2_web_api.modules.aluno.useCases;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.ap2.ap2_web_api.modules.aluno.entity.AlunoEntity;
import br.com.ap2.ap2_web_api.modules.aluno.repository.AlunoRepository;

@Service
public class ListAllAlunosUseCase {
  
  @Autowired
  private AlunoRepository alunoRepository;
  
  public List<AlunoEntity> execute() {
    return this.alunoRepository.findAll();
  }
}
