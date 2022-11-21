package module6.sprint2.repository;

import module6.sprint2.entity.cart.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface ICartRepository extends JpaRepository<Cart, Long> {
    @Query(value = "SELECT `cart`.*, `cart_book`.book_id FROM `cart` \n" +
            "join cart_book on `cart` .cart_id = `cart_book`.cart_id\n" +
            "having `cart_book`.book_id > 0 and `cart`.cart_status = 0 and `cart`.cart_account_id = ?1\n" +
            ";", nativeQuery = true)
    List<Cart> findAllCart(Long id);

    @Modifying
    @Query(value = "UPDATE `cart` SET `cart`.cart_quantity = ?1, `cart`.cart_total_money = ?2 WHERE (`cart`.cart_id = ?3)", nativeQuery = true)
    void updateQuantityCart(Integer cartQuantity, Double cartTotalMoney, Long cartId);

    @Modifying
    @Query(value = "UPDATE `cart` SET `cart_code` = ?1, `cart_purchase_date` = ?2, `cart_status` = ?3 WHERE (`cart_id` = ?4);", nativeQuery = true)
    void paymentCart(String cartCode, String cartPurchaseDate, Boolean cartStatus, Long cartId);

    // check code
//    @Query(value = "SELECT `cart`.cart_code FROM `cart` where `cart`.cart_code is not null order by cart_purchase_date asc", nativeQuery = true)
    @Query(value = "SELECT `cart`.cart_id FROM `cart` where `cart`.cart_id is not null order by `cart`.cart_id ;", nativeQuery = true)
    List<String> checkCodeCart();

    @Modifying
    @Query(value = "DELETE from `cart` where cart_id = ?1 ", nativeQuery = true)
    void deleteManyBookCart(Long id);
}
