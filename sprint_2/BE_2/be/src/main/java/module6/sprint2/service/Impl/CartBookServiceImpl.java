package module6.sprint2.service.Impl;

import module6.sprint2.entity.cart.Cart;
import module6.sprint2.entity.cart.CartBook;
import module6.sprint2.repository.ICartBookRepository;
import module6.sprint2.service.ICartBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartBookServiceImpl implements ICartBookService {
    @Autowired
    ICartBookRepository cartBookRepository;

    @Override
    public List<CartBook> getListCartBook(Long id) {
        return cartBookRepository.getListCartBook(id);
    }

    @Override
    public CartBook addBook(CartBook cartBook) {
        return cartBookRepository.save(cartBook);
    }

    @Override
    public CartBook findByCartId(Cart cart) {
        return cartBookRepository.findByCartId(cart);
    }
}
