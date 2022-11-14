package module6.sprint2.service.Impl;

import module6.sprint2.repository.IPromotionRepository;
import module6.sprint2.service.IPromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PromotionServiceImpl implements IPromotionService {
    @Autowired
    IPromotionRepository promotionRepository;
}
