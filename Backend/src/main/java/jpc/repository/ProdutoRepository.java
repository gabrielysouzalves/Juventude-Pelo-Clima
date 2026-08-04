package jpc.repository;

import jpc.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByQuantidadeGreaterThan(Integer quantidade);

}
