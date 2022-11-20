package module6.sprint2.service.Impl;

import module6.sprint2.entity.account.Account;
import module6.sprint2.repository.IAccountRepository;
import module6.sprint2.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements IAccountService {
    @Autowired
    IAccountRepository accountRepository;

    @Override
    public Account findById(Long accountId) {
        return accountRepository.findById(accountId).orElse(null);
    }
}
