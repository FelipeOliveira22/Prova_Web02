package br.com.ap2.ap2_web_api.modules.aluno.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.ap2.ap2_web_api.modules.aluno.entity.AlunoEntity;

public interface AlunoRepository extends JpaRepository<AlunoEntity, UUID> {
    List<AlunoEntity> findByNomeContainingIgnoreCase(String nome);
}
