package module6.sprint2.service.Impl;

import module6.sprint2.entity.book.Book;
import module6.sprint2.repository.IBookRepository;
import module6.sprint2.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements IBookService {
    @Autowired
    IBookRepository bookRepository;

    @Override
    public Page<Book> findAllBook(Pageable pageable) {
        return bookRepository.findBookList(pageable);
    }

    @Override
    public List<Book> findBookSlide() {
        return bookRepository.findBookSlide();
    }

    @Override
    public Optional<Book> findBookById(Long id) {
        return bookRepository.findBookById(id);
    }

    @Override
    public List<Book> findBookSameAuthor(Long idAuthor, Long idBook) {
        return bookRepository.findBookSameAuthor(idAuthor, idBook);
    }

    @Override
    public Page<Book> findBookByCategory(Long idCategory, Pageable pageable) {
        return bookRepository.findBookByCategory(idCategory, pageable);
    }

    @Override
    public Page<Book> findBookByName(String name, Pageable pageable) {
        return bookRepository.findBookByName('%'+name+'%', pageable);
    }

    @Override
    public List<Book> findBookBestSale() {
        return bookRepository.findBookBestSale();
    }

    @Override
    public Page<Book> findBookSaleSpecial(Pageable pageable) {
        return bookRepository.findBookSaleSpecial(pageable);
    }
}
