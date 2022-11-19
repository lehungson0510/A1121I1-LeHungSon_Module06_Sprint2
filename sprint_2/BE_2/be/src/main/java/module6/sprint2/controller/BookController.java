package module6.sprint2.controller;

import module6.sprint2.entity.book.Book;
import module6.sprint2.entity.book.Category;
import module6.sprint2.entity.cart.Cart;
import module6.sprint2.entity.cart.CartBook;
import module6.sprint2.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("api/book")
public class BookController {
    @Autowired
    IBookService bookService;

    @Autowired
    IAuthorService authorService;

    @Autowired
    ICategoryService categoryService;

    @Autowired
    IPromotionService promotionService;

    @Autowired
    ICartBookService cartBookService;

    @Autowired
    ICartService cartService;

    //    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_CUSTOMER')")
    @GetMapping("/book-user/no-login/list")
    public ResponseEntity<Page<Book>> findAllBook(@PageableDefault(value = 8) Pageable pageable) {
        Page<Book> bookList = bookService.findAllBook(pageable);
        if (bookList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(bookList, HttpStatus.OK);
        }
    }

    @GetMapping("/book-user/no-login/slide")
    public ResponseEntity<List<Book>> findBookSlide() {
        List<Book> bookList = bookService.findBookSlide();
        if (bookList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(bookList, HttpStatus.OK);
        }
    }

    @GetMapping("/book-user/no-login/detail/{id}")
    public ResponseEntity<Book> findBookById(@PathVariable("id") Long id) {
        Optional<Book> bookDetail = bookService.findBookById(id);
        if (!bookDetail.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(bookDetail.get(), HttpStatus.OK);
        }
    }

    @GetMapping("/book-user/no-login/same-author")
    public ResponseEntity<List<Book>> findBookSameAuthor(@RequestParam("idAuthor") Long idAuthor, @RequestParam("idBook") Long idBook) {
        List<Book> bookList = bookService.findBookSameAuthor(idAuthor, idBook);
//        if (bookList.isEmpty()) {
//            return new ResponseEntity<>(bookList, HttpStatus.NOT_FOUND);
//        } else {
        return new ResponseEntity<>(bookList, HttpStatus.OK);
    }

    @GetMapping("/book-user/no-login/category")
    public ResponseEntity<List<Category>> findAllCategory() {
        List<Category> categoryList = categoryService.findAllCategory();
        if (categoryList.isEmpty()) {
            return new ResponseEntity<>(categoryList, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(categoryList, HttpStatus.OK);
        }
    }

    @GetMapping("/book-user/no-login/find-book-by-category/{idCategory}")
    public ResponseEntity<Page<Book>> findBookByCategory(@PathVariable("idCategory") Long idCategory, @PageableDefault(value = 8) Pageable pageable) {
        if (idCategory == 1) {
            Page<Book> bookList = bookService.findAllBook(pageable);
            if (bookList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(bookList, HttpStatus.OK);
            }
        } else {
            Page<Book> bookList = bookService.findBookByCategory(idCategory, pageable);
//            if (bookList.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            } else {
            return new ResponseEntity<>(bookList, HttpStatus.OK);
        }
    }

    @GetMapping("/book-user/no-login/find-book-by-name")
    public ResponseEntity<Page<Book>> findBookByName(@RequestParam("name") String name, @PageableDefault(value = 8) Pageable pageable) {
        Page<Book> bookList;
        if (name == "") {
            bookList = bookService.findAllBook(pageable);
        } else {
            bookList = bookService.findBookByName(name, pageable);
//            if (bookList.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            } else {
        }
        return new ResponseEntity<>(bookList, HttpStatus.OK);
    }

    @GetMapping("/book-user/no-login/best-sale")
    public ResponseEntity<List<Book>> findBookBestSale() {
        List<Book> bookList = bookService.findBookBestSale();
        if (bookList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(bookList, HttpStatus.OK);
        }
    }

    @GetMapping("/book-user/no-login/sale-special")
    public ResponseEntity<Page<Book>> findBookSaleSpecial(@PageableDefault(value = 8) Pageable pageable) {
        Page<Book> bookList = bookService.findBookSaleSpecial(pageable);
        if (bookList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(bookList, HttpStatus.OK);
        }
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<?> editBook(@PathVariable("id") Long id, @RequestBody Book book) {
        bookService.editBook(book.getBookName(), book.getBookImage(), book.getBookContent(), book.getBookPrice(), book.getBookTranslator(), book.getBookTotalPage(), book.getBookSize(), book.getBookPublishDate(), book.getBookQuantity(), book.getBookPublisher(), book.getBookCategoryId().getCategoryId(), book.getBookAuthorId().getAuthorId(), book.getBookPromotionId().getPromotionId(), id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/book-user/cart-book/{id}")
    public ResponseEntity<List<CartBook>> findAllCart(@PathVariable("id") Long id) {
        List<CartBook> cartBookList = cartBookService.getListCartBook(id);
        if (cartBookList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(cartBookList, HttpStatus.OK);
        }
    }

    @GetMapping("/book-user/no-login/best-seller")
    public ResponseEntity<Page<Book>> findBookBestSeller(@PageableDefault(value = 8) Pageable pageable) {
        System.out.println(pageable.getPageNumber());
        Page<Book> bookList = bookService.findBookBestSeller(pageable);
        if (bookList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(bookList, HttpStatus.OK);
        }
    }

    @PutMapping("/book-user/cart/update-quantity")
    public ResponseEntity<CartBook> updateQuantityCart(@RequestBody CartBook cartBook) {
        Double totalMoney = cartBook.getBookId().getBookPrice() * cartBook.getCartId().getCartQuantity()
                - cartBook.getBookId().getBookPrice() * cartBook.getCartId().getCartQuantity()
                * (cartBook.getBookId().getBookPromotionId().getPromotionPercent() / 100);
        cartBook.getCartId().setCartTotalMoney(totalMoney);
        cartService.updateQuantityCart(cartBook.getCartId().getCartQuantity(), cartBook.getCartId().getCartTotalMoney(), cartBook.getCartId().getCartId());
        return new ResponseEntity<>(cartBook, HttpStatus.CREATED);
    }
}


