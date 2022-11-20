package module6.sprint2.service.Impl;

import module6.sprint2.entity.cart.Cart;
import module6.sprint2.repository.ICartRepository;
import module6.sprint2.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements ICartService {
    @Autowired
    ICartRepository cartRepository;

    @Override
    public List<Cart> findAllCart(Long id) {
        return cartRepository.findAllCart(id);
    }

    @Override
    public void updateQuantityCart(Integer quantity, Double totalMoney, Long cartId) {
        cartRepository.updateQuantityCart(quantity, totalMoney, cartId);
    }

    @Override
    public Optional<Cart> findById(Long id) {
        return cartRepository.findById(id);
    }

    @Override
    @Transactional
    @Modifying
    public void deleteCartById(Long cartId) {
        cartRepository.deleteById(cartId);
    }

    @Override
    public void paymentCart(String cartCode, String cartPurchaseDate, Boolean cartStatus, Long cartId) {
        cartRepository.paymentCart(cartCode, cartPurchaseDate, cartStatus, cartId);
    }

    @Override
    public List<String> checkCodeCart() {
        return cartRepository.checkCodeCart();
    }

    @Override
    public Cart addBook(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public void deleteManyBookCart(Long id) {
        cartRepository.deleteManyBookCart(id);
    }
}
