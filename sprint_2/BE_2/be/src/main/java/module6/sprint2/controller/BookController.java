package module6.sprint2.controller;

import module6.sprint2.entity.book.Book;
import module6.sprint2.entity.book.Category;
import module6.sprint2.service.IAuthorService;
import module6.sprint2.service.IBookService;
import module6.sprint2.service.ICategoryService;
import module6.sprint2.service.IPromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    //    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_CUSTOMER')")
    @GetMapping("list")
    public ResponseEntity<Page<Book>> findAllBook(@PageableDefault(value = 8) Pageable pageable) {
        Page<Book> bookList = bookService.findAllBook(pageable);
        if (bookList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(bookList, HttpStatus.OK);
        }
    }

    @GetMapping("/slide")
    public ResponseEntity<List<Book>> findBookSlide() {
        List<Book> bookList = bookService.findBookSlide();
        if (bookList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(bookList, HttpStatus.OK);
        }
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Book> findBookById(@PathVariable("id") Long id) {
        Optional<Book> bookDetail = bookService.findBookById(id);
        if (!bookDetail.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(bookDetail.get(), HttpStatus.OK);
        }
    }

    @GetMapping("/same-author")
    public ResponseEntity<List<Book>> findBookSameAuthor(@RequestParam("idAuthor") Long idAuthor, @RequestParam("idBook") Long idBook) {
        List<Book> bookList = bookService.findBookSameAuthor(idAuthor, idBook);
//        if (bookList.isEmpty()) {
//            return new ResponseEntity<>(bookList, HttpStatus.NOT_FOUND);
//        } else {
        return new ResponseEntity<>(bookList, HttpStatus.OK);
    }

    @GetMapping("/category")
    public ResponseEntity<List<Category>> findAllCategory() {
        List<Category> categoryList = categoryService.findAllCategory();
        System.out.println(categoryList.size());
        if (categoryList.isEmpty()) {
            return new ResponseEntity<>(categoryList, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(categoryList, HttpStatus.OK);
        }
    }

    @GetMapping("/find-book-by-category/{idCategory}")
    public ResponseEntity<Page<Book>> findBookByCategory(@PathVariable("idCategory") Long idCategory, @PageableDefault(value = 8) Pageable pageable) {
        System.out.println(idCategory);
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

    @GetMapping("/find-book-by-name")
    public ResponseEntity<Page<Book>> findBookByName(@RequestParam("name") String name, @PageableDefault(value = 8) Pageable pageable) {
        System.out.println(name);
        Page<Book> bookList = bookService.findBookByName(name, pageable);
//            if (bookList.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            } else {
        return new ResponseEntity<>(bookList, HttpStatus.OK);
    }

    @GetMapping("/best-sale")
    public ResponseEntity<List<Book>> findBookBestSale() {
        List<Book> bookList = bookService.findBookBestSale();
        if (bookList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(bookList, HttpStatus.OK);
        }
    }

    @GetMapping("/sale-special")
    public ResponseEntity<Page<Book>> findBookSaleSpecial(@PageableDefault(value = 8) Pageable pageable) {
        Page<Book> bookList = bookService.findBookSaleSpecial(pageable);
        if (bookList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(bookList, HttpStatus.OK);
        }
    }

}


