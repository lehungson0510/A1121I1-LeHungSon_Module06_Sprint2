package module6.sprint2.repository;

import module6.sprint2.entity.cart.CartBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ICartBookRepository extends JpaRepository<CartBook, Long> {
}
