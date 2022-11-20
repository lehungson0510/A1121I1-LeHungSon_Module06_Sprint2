package module6.sprint2.repository;

import module6.sprint2.entity.cart.Cart;
import module6.sprint2.entity.cart.CartBook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface ICartBookRepository extends JpaRepository<CartBook, Long> {
//    @Query(value="select * from cart_book where ", nativeQuery = true)
//    Page<CartBook> getListCartBook(Pageable pageable);

    @Query(value = "SELECT `cart_book`.*, `cart`.cart_status, `cart`.cart_account_id FROM `cart_book`\n" +
            "join `cart` on `cart` .cart_id = `cart_book`.cart_id\n" +
            "having `cart_book`.book_id > 0 and `cart`.cart_status = 0 and `cart`.cart_account_id = ?1\n" +
            ";", nativeQuery = true)
    List<CartBook> getListCartBook(Long id);

    CartBook findByCartId(Cart cart);
}
