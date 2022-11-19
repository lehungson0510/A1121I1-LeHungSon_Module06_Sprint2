package module6.sprint2.config;

import module6.sprint2.security.jwt.JwtAuthenticationEntryPoint;
import module6.sprint2.security.jwt.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.http.HttpMethod.GET;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private UserDetailsService jwtService;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors();
        httpSecurity.csrf().disable()
                .authorizeRequests()
//                .antMatchers("/auth/login").permitAll()
//                .antMatchers(HttpHeaders.ALLOW).permitAll()
                .antMatchers("/api/book/book-user/no-login/**").permitAll()
                .antMatchers(HttpHeaders.ALLOW).permitAll()
                .antMatchers("/api/account/**", "/api/customer/**", "/api/book/**", "/api/cart/**").hasAnyAuthority("ROLE_ADMIN")
                .antMatchers("/api/account/**", "/api/customer/**", "/api/book/**", "/api/cart/**").hasAnyAuthority("ROLE_USER")
//                .antMatchers("/api/customer/**", "/api/employee/**").hasAuthority("ROLE_SELL")
                .antMatchers("/**/*.js", "/**/*.css", "/**/*.jpg", "/**/*.png").permitAll()
                .and().authorizeRequests().antMatchers("/auth/login").permitAll()
                .antMatchers(HttpHeaders.ALLOW).permitAll()
                .anyRequest().authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        ;
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
//
//        httpSecurity.cors();
//        httpSecurity.csrf().disable()
//                .authorizeRequests().antMatchers("/auth/login").permitAll()
//                .antMatchers(HttpHeaders.ALLOW).permitAll()
////                .antMatchers(GET,"/welcome").hasAnyAuthority("ROLE_ADMIN")
////                .antMatchers("/api/customer/**", "/api/import/**", "/api/cart/**").hasAnyAuthority("ROLE_ACCOUNTANT")
////                .antMatchers("/api/customer/**", "/api/employee/**").hasAuthority("ROLE_SELL")
////                .antMatchers(  "/**/*.js", "/**/*.css", "/**/*.jpg", "/**/*.png").permitAll()
////                .anyRequest().authenticated()
//                .and()
//                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
//                .and()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//        ;
//        httpSecurity.addFilterBefore(jwtRequestFilter , UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // lấy userdetail của jwt service, giải mã mật khẩu
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(jwtService).passwordEncoder(passwordEncoder());
    }
}
