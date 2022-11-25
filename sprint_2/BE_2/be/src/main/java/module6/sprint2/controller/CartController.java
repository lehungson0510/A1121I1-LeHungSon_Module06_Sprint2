package module6.sprint2.controller;

import module6.sprint2.entity.book.Book;
import module6.sprint2.entity.cart.Cart;
import module6.sprint2.entity.cart.CartBook;
import module6.sprint2.service.IAccountService;
import module6.sprint2.service.IBookService;
import module6.sprint2.service.ICartBookService;
import module6.sprint2.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("api/cart")
public class CartController {
    @Autowired
    ICartService cartService;

    @Autowired
    ICartBookService cartBookService;

    @Autowired
    IBookService bookService;

    @Autowired
    IAccountService accountService;

    @GetMapping("/cart-book-list/{id}")
    public ResponseEntity<List<CartBook>> findAllCart(@PathVariable("id") Long id) {
        List<CartBook> cartBookList = cartBookService.getListCartBook(id);
//        if (cartBookList.isEmpty()) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        } else {
        return new ResponseEntity<>(cartBookList, HttpStatus.OK);
//        }
    }

    @PutMapping("/update-quantity")
    public ResponseEntity<CartBook> updateQuantityCart(@RequestBody CartBook cartBook) {
        Double totalMoney = cartBook.getBookId().getBookPrice() * cartBook.getCartId().getCartQuantity()
                - cartBook.getBookId().getBookPrice() * cartBook.getCartId().getCartQuantity()
                * (cartBook.getBookId().getBookPromotionId().getPromotionPercent() / 100);
        cartBook.getCartId().setCartTotalMoney(totalMoney);
        cartService.updateQuantityCart(cartBook.getCartId().getCartQuantity(), cartBook.getCartId().getCartTotalMoney(), cartBook.getCartId().getCartId());
        return new ResponseEntity<>(cartBook, HttpStatus.CREATED);
    }

    @PostMapping("/add-book")
    public ResponseEntity<?> addBook(@RequestParam("accountId") Long accountId
            , @RequestBody Book book) {
        Optional<Book> bookById = bookService.findBookById(book.getBookId());
        List<CartBook> cartBookList = cartBookService.getListCartBook(accountId);
        System.out.println(cartBookList.size());
        // kiểm tra tồn tại giỏ hàng
        for (CartBook cartBook : cartBookList) {
            // update số lượng
            // book.getBookQuantity() là số lượng đưa vào giỏ hàng
            if (cartBook.getBookId().getBookId() == book.getBookId()) {
                if ((book.getBookQuantity() + cartBook.getCartId().getCartQuantity()) > bookById.get().getBookQuantity()) {
                    String message = "Đã hết hàng hoặc không đủ số lượng!";
                    return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
                }
                cartBook.getCartId().setCartQuantity(cartBook.getCartId().getCartQuantity() + book.getBookQuantity());
                Double totalMoney = cartBook.getBookId().getBookPrice() * cartBook.getCartId().getCartQuantity()
                        - cartBook.getBookId().getBookPrice() * cartBook.getCartId().getCartQuantity()
                        * (cartBook.getBookId().getBookPromotionId().getPromotionPercent() / 100);
                cartBook.getCartId().setCartTotalMoney(totalMoney);
                cartService.updateQuantityCart(cartBook.getCartId().getCartQuantity(), cartBook.getCartId().getCartTotalMoney(), cartBook.getCartId().getCartId());
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }

        // thêm sách mới vào giỏ hàng
        // book.getBookQuantity() là số lượng đưa vào giỏ hàng
        if (book.getBookQuantity() > bookById.get().getBookQuantity()) {
            String message = "Đã hết hàng hoặc không đủ số lượng!";
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }

//        // Tự code
//        LocalDate current = LocalDate.now();
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//        String formatted = current.format(formatter);
//
//        // Tự code
//        List<String> cartCodeList = cartService.checkCodeCart();
//
//        // lấy mã hoá đơn, tự code
//        String cartCode = "";
//        for (String code : cartCodeList) {
//            cartCode = code;
//        }
//        if (cartCode.equals("")) {
//            cartCode = "1";
//        }
//
//        String cartCodePayment = "";
//        String[] cartCodeArray = cartCode.split("-");
//
//
//        cartCodePayment = "MHD-" + (Integer.parseInt(cartCodeArray[1]) + 1);
////        cartCodePayment = "C-" + (Integer.parseInt(cartCode) + 1);
//
//
//
//        // Tự code
//        cart.setCartPurchaseDate(current);
//        cart.setCartCode(cartCodePayment);

        Cart cart = new Cart();

        Double totalMoney = book.getBookPrice() * book.getBookQuantity()
                - book.getBookPrice() * book.getBookQuantity()
                * (book.getBookPromotionId().getPromotionPercent() / 100);
        cart.setCartQuantity(book.getBookQuantity());
        cart.setCartTotalMoney(totalMoney);
        cart.setCartAccountId(accountService.findById(accountId));


        Cart cartCreate = cartService.addBook(cart);

        CartBook cartBook = new CartBook();
        cartBook.setBookId(bookService.findBookById(book.getBookId()).get());
        cartBook.setCartId(cartCreate);


        CartBook cartBookCreate = cartBookService.addBook(cartBook);
        return new ResponseEntity<>(cartBookCreate, HttpStatus.OK);
    }

    // xoá cart
    @DeleteMapping("/cart-delete")
    public ResponseEntity<Cart> deleteCart(@RequestParam("cardId") Long cardId) {
        System.out.println(cardId);
        Optional<Cart> foundCart = cartService.findById(cardId);
        if (!foundCart.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            cartService.deleteCartById(cardId);
            return new ResponseEntity<>(foundCart.get(), HttpStatus.NO_CONTENT);
        }
    }

    // thanh toán giỏ hàng
    @PutMapping("/payment")
    public ResponseEntity<?> paymentCart(@RequestBody List<Cart> cartListPayment) {
        List<String> cartCodeList = cartService.checkCodeCart();

        // lấy mã hoá đơn
        String cartCode = "";
        for (String code : cartCodeList) {
            cartCode = code;
        }
//        if (cartCode.equals("")) {
//            cartCode = "1";
//        }

        String cartCodePayment = "";
        if (!cartCodeList.isEmpty()) {
            String[] cartCodeArray = cartCode.split("-");
            cartCodePayment = "MHD-" + (Integer.parseInt(cartCodeArray[1]) + 1);
        } else {
            cartCodePayment = "MHD-1";
        }


        // lấy ngày hiện tại
        LocalDateTime current = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formatted = current.format(formatter);

        CartBook cartBook = null;
        // tiến hành thanh toán
        for (Cart cart : cartListPayment) {
            cartService.paymentCart(cartCodePayment, formatted, true, cart.getCartId());

            // cập nhật lại số lượng sách
            cartBook = cartBookService.findByCartId(cart);
            cartBook.getBookId().setBookQuantity(cartBook.getBookId().getBookQuantity() - cart.getCartQuantity());
            bookService.updateQuantityBook(cartBook.getBookId());
        }
        System.out.println(cartListPayment.size());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/delete-many-book-cart")
    public ResponseEntity<?> deleteManyCartBook(@RequestBody Long[] cardId) {
        System.out.println("Xóa");
        for (int i = 0; i < cardId.length; i++) {
            cartService.deleteManyBookCart(cardId[i]);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
