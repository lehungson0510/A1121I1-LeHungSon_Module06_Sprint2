package module6.sprint2.service;

import module6.sprint2.entity.cart.Cart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ICartService {
    List<Cart> findAllCart(Long id);

    void updateQuantityCart(Integer cartQuantity, Double cartTotalMoney, Long cartId);

    Optional<Cart> findById(Long id);

    void deleteCartById(Long cartId);

    void paymentCart(String cartCode, String cartPurchaseDate, Boolean cartStatus, Long cartId);

    List<String> checkCodeCart();

    Cart addBook(Cart cart);

    void deleteManyBookCart(Long id);
}
