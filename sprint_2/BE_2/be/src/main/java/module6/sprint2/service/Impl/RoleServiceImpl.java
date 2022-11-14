package module6.sprint2.service.Impl;

import module6.sprint2.repository.IRoleRepository;
import module6.sprint2.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements IRoleService {
    @Autowired
    IRoleRepository roleRepository;
}
