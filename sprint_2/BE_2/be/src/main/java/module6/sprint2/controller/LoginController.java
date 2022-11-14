package module6.sprint2.controller;

import module6.sprint2.payload.request.LoginRequest;
import module6.sprint2.payload.response.JwtResponse;
import module6.sprint2.security.jwt.JwtServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class LoginController {
    @Autowired
    private JwtServiceImpl jwtService;

    @PostMapping({"/auth/login"})
    public JwtResponse createJwtToken(@RequestBody LoginRequest loginRequest) throws Exception {
        return jwtService.createJwtToken(loginRequest);
    }
}
