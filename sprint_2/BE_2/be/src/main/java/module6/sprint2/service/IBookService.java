package module6.sprint2.service;

import module6.sprint2.entity.book.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
}
