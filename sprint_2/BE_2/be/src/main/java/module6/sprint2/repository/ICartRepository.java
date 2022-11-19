package module6.sprint2.repository;

import module6.sprint2.entity.cart.Cart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ICartRepository extends JpaRepository<Cart, Long> {

    @Modifying
    @Query(value = "UPDATE `cart` SET `cart`.cart_quantity = ?1, `cart`.cart_total_money = ?2 WHERE (`cart`.cart_id = ?3)", nativeQuery = true)
    void updateQuantityCart(Integer cartQuantity, Double cartTotalMoney, Long cartId);
}
