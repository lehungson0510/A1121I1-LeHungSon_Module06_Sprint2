package module6.sprint2.service.Impl;

import module6.sprint2.entity.cart.Cart;
import module6.sprint2.repository.ICartRepository;
import module6.sprint2.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements ICartService {
    @Autowired
    ICartRepository cartRepository;

    @Override
    public void updateQuantityCart(Integer quantity, Double totalMoney, Long cartId) {
        cartRepository.updateQuantityCart(quantity, totalMoney, cartId);
    }
}
