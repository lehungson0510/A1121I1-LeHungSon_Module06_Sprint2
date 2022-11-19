package module6.sprint2.service;

import module6.sprint2.entity.cart.Cart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICartService {

    void updateQuantityCart(Integer cartQuantity, Double cartTotalMoney, Long cartId);
}
