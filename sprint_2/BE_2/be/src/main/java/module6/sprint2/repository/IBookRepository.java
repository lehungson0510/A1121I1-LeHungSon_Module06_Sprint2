package module6.sprint2.repository;

import module6.sprint2.entity.book.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface IBookRepository extends JpaRepository<Book, Long> {

    @Query(value = "select * from book limit 3", nativeQuery = true)
    List<Book> findBookSlide();

    @Query(value = "select * from book where book_flag = 0 order by book_publish_date desc", nativeQuery = true)
    Page<Book> findBookList(Pageable pageable);

    @Query(value = "select * from book where book_id = ?1 and book_flag = 0", nativeQuery = true)
    Optional<Book> findBookById(Long id);

    @Query(value = "select * from book where book_author_id = ?1 and book_id != ?2 and book_flag = 0 order by book_publish_date desc", nativeQuery = true)
    List<Book> findBookSameAuthor(Long idAuthor, Long idBook);

    @Query(value = "select * from book where book_category_id = ?1 and book_flag = 0 order by book_publish_date desc", nativeQuery = true)
    Page<Book> findBookByCategory(Long idCategory, Pageable pageable);

    @Query(value = "select * from book where book_name like ?1 and book_flag = 0 order by book_publish_date desc", nativeQuery = true)
    Page<Book> findBookByName(String name, Pageable pageable);

    @Query(value = "select * from book \n" +
            "join promotion on book_promotion_id = promotion_id\n" +
            "order by promotion_percent desc; ", nativeQuery = true)
    List<Book> findBookBestSale();

    @Query(value = "select * from book where book_flag = 0 and book_promotion_id > 1 order by book_publish_date desc", nativeQuery = true)
    Page<Book> findBookSaleSpecial(Pageable pageable);

    @Modifying
    @Query(value = "UPDATE `sprint2`.`book` SET `book_name` = ?1, `book_image` = ?2, `book_content` = ?3, `book_price` = ?4, `book_translator` = ?5, `book_total_page` = ?6, `book_size` = ?7, `book_publish_date` = ?8, `book_quantity` = ?9, `book_publisher` = ?10, `book_category_id` = ?11, `book_author_id` = ?12, `book_promotion_id` = ?13 WHERE `book_id` = ?14 ", nativeQuery = true)
    void editBook(String name, String img, String content, Double price, String translator, Integer totalPage, String size, LocalDate publishDate, Integer quantity, String publisher, Long idCategory, Long idAuthor, Long idPromotion, Long idBook);

    @Modifying
    @Query(value = "UPDATE `sprint2`.`book` SET book_flag = 1 where book_id = ?1 ", nativeQuery = true)
    void deleteBook(Long id);

    @Query(value = "select `book`.*, `cart`.cart_status from `book`\n" +
            "join `cart_book` on `book`.book_id = `cart_book`.book_id\n" +
            "join `cart` on `cart`.cart_id = `cart_book`.cart_id\n" +
            "group by `cart_book`.book_id \n" +
            "having sum(`cart`.cart_quantity) is not null and `book`.book_flag = 0 and `cart`.cart_status = 1 and `cart_book`.book_id > 0\n" +
            "order by sum(`cart`.cart_quantity) desc", nativeQuery = true)
    Page<Book> findBookBestSeller(Pageable pageable);
}
