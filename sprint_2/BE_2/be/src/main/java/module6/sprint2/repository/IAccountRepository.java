package module6.sprint2.repository;

import module6.sprint2.entity.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface IAccountRepository extends JpaRepository<Account, Long> {
    @Query(value = "SELECT * FROM account WHERE username=?1", nativeQuery = true)
    Account findAccountByUsername(String username);
}
