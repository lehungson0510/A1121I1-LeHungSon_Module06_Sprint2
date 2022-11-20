package module6.sprint2.service;

import module6.sprint2.entity.cart.Cart;
import module6.sprint2.entity.cart.CartBook;

import java.util.List;

public interface ICartBookService {
    List<CartBook> getListCartBook(Long id);

    CartBook addBook(CartBook cartBook);

    CartBook findByCartId(Cart cart);
}
