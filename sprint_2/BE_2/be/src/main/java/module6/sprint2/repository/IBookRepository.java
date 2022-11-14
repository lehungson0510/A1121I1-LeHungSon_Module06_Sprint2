package module6.sprint2.repository;

import module6.sprint2.entity.book.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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

}
