package module6.sprint2.service.Impl;

import module6.sprint2.entity.customer.Customer;
import module6.sprint2.repository.ICustomerRepository;
import module6.sprint2.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements ICustomerService {
    @Autowired
    ICustomerRepository customerRepository;

    @Override
    public Customer findCustomer(Long accountTd) {
        return customerRepository.findById(accountTd).orElse(null);
    }
}
