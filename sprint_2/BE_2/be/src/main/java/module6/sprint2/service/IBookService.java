package module6.sprint2.service;

import module6.sprint2.entity.book.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IBookService {
    Page<Book> findAllBook(Pageable pageable);

    List<Book> findBookSlide();

    Optional<Book> findBookById(Long id);

    List<Book> findBookSameAuthor(Long idAuthor, Long idBook);

    Page<Book> findBookByCategory(Long idCategory, Pageable pageable);

    Page<Book> findBookByName(String name, Pageable pageable);

    List<Book> findBookBestSale();

    Page<Book> findBookSaleSpecial(Pageable pageable);

    void editBook(String name, String img, String content, Double price, String translator, Integer totalPage, String size, LocalDate publishDate, Integer quantity, String publisher, Long idCategory, Long idAuthor, Long idPromotion, Long idBook);

    Page<Book> findBookBestSeller(Pageable pageable);
}
