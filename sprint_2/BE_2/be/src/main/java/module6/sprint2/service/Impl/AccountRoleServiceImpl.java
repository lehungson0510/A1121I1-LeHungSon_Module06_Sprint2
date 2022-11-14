package module6.sprint2.service.Impl;

import module6.sprint2.repository.IAccountRoleRepository;
import module6.sprint2.service.IAccountRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountRoleServiceImpl implements IAccountRoleService {
    @Autowired
    IAccountRoleRepository accountRoleRepository;
}
