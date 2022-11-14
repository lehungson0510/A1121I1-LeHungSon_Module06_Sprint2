package module6.sprint2.service.Impl;

import module6.sprint2.entity.book.Category;
import module6.sprint2.repository.ICategoryRepository;
import module6.sprint2.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements ICategoryService {
    @Autowired
    ICategoryRepository categoryRepository;

    @Override
    public List<Category> findAllCategory() {
        return categoryRepository.findAll();
    }
}
