package module6.sprint2.service;

import module6.sprint2.entity.account.Account;

public interface IAccountService {
    Account findById(Long accountId);
}
