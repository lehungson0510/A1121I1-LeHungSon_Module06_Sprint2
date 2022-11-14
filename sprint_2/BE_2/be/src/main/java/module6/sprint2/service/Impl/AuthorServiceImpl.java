package module6.sprint2.service.Impl;

import module6.sprint2.repository.IAuthorRepository;
import module6.sprint2.service.IAuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorServiceImpl implements IAuthorService {
    @Autowired
    IAuthorRepository authorRepository;
}
