package module6.sprint2.service;

import module6.sprint2.entity.customer.Customer;

public interface ICustomerService {
    Customer findCustomer(Long id);
}
