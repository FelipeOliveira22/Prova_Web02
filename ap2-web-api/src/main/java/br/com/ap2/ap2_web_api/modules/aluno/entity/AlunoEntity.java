package br.com.ap2.ap2_web_api.modules.aluno.entity;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "Aluno")
@Table(name = "Aluno")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AlunoEntity {
  
  @Id 
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  private String nome;
  private String curso;
  private float ira;
}
