package br.com.ap2.ap2_web_api.modules.aluno.controller;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.ap2.ap2_web_api.modules.aluno.entity.AlunoEntity;
import br.com.ap2.ap2_web_api.modules.aluno.useCases.CreateAlunoUseCase;
import br.com.ap2.ap2_web_api.modules.aluno.useCases.DeleteAlunoUseCase;
import br.com.ap2.ap2_web_api.modules.aluno.useCases.GetAlunoUseCase;
import br.com.ap2.ap2_web_api.modules.aluno.useCases.ListAllAlunosUseCase;
import br.com.ap2.ap2_web_api.modules.aluno.useCases.ListAlunoByNameUseCase;
import br.com.ap2.ap2_web_api.modules.aluno.useCases.UpdateAlunoUseCase;

@RestController
@RequestMapping("/aluno")
@CrossOrigin(origins = "*")
public class AlunoController {

  @Autowired
  private CreateAlunoUseCase createAlunoUseCase;

  @Autowired
  private UpdateAlunoUseCase updateAlunoUseCase;

  @Autowired
  private GetAlunoUseCase getAlunoUseCase;

  @Autowired
  private DeleteAlunoUseCase deleteAlunoUseCase;

  @Autowired
  private ListAllAlunosUseCase listAllAlunosUseCase;

  @Autowired
  private ListAlunoByNameUseCase listAlunoByNameUseCase;

  // Cria um novo aluno
  @PostMapping("/")
  public ResponseEntity<Object> createAluno(@RequestBody AlunoEntity alunoEntity) {
    try {
      var aluno = createAlunoUseCase.execute(alunoEntity);
      return ResponseEntity.status(HttpStatus.CREATED).body(aluno);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar aluno: " + e.getMessage());
    }
  }

  // Edita um aluno ja existente
  @PutMapping("/")
  public ResponseEntity<Object> updateAluno(@RequestBody AlunoEntity alunoEntity) {
    try {
      var aluno = updateAlunoUseCase.execute(alunoEntity);
      return ResponseEntity.ok().body(aluno);
    } catch (NoSuchElementException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno não encontrado: " + e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar aluno: " + e.getMessage());
    }
  }

  // Buscar um aluno por ID
  @GetMapping("/{id}")
  public ResponseEntity<Object> getAluno(@PathVariable UUID id) {
    try {
      Optional<AlunoEntity> aluno = getAlunoUseCase.execute(id);
      return ResponseEntity.ok(aluno);
    } catch (NoSuchElementException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno não encontrado: " + e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar aluno: " + e.getMessage());
    }
  }

  // Deletar um aluno por ID
  @DeleteMapping("/{id}")
  public ResponseEntity<Object> deleteAluno(@PathVariable UUID id) {
    try {
      deleteAlunoUseCase.execute(id);
      return ResponseEntity.noContent().build();
    } catch (NoSuchElementException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno não encontrado: " + e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao deletar aluno: " + e.getMessage());
    }
  }

  // Listar todos os alunos
  @GetMapping("/")
  public ResponseEntity<Object> listAllAlunos() {
    try {
      List<AlunoEntity> alunos = listAllAlunosUseCase.execute();
      return ResponseEntity.ok(alunos);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao listar alunos: " + e.getMessage());
    }
  }
  // Listar por usuário
  @GetMapping("/nome/{nome}")
  public ResponseEntity<Object> listAlunosByNome(@PathVariable String nome) {
    try {
      List<AlunoEntity> alunos = listAlunoByNameUseCase.execute(nome);
      return ResponseEntity.ok(alunos);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao buscar alunos: " + e.getMessage());
    }
  }
}

