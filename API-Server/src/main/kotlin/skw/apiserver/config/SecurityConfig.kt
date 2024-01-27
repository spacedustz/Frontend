package skw.apiserver.config

import lombok.RequiredArgsConstructor
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import skw.apiserver.filter.JwtAuthenticationFilter

/**
 * @author 신건우
 * @desc 쿠키, 세션 사용 X, CSRF Disable
 */
@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
class SecurityConfig(
    private val jwtAuthenticationFilter: JwtAuthenticationFilter
) {
    private val signupPages = arrayOf(
        "/",
        "/api/user/sign-up",
        "/api/user/sign-in",
        "/api/comment"
    )

    @Bean
    fun filterChain(http: HttpSecurity) = http
        .csrf(CsrfConfigurer<HttpSecurity>::disable)
        .headers { header -> header.frameOptions(HeadersConfigurer<HttpSecurity>.FrameOptionsConfig::sameOrigin) }
        .authorizeHttpRequests { authorize ->
            authorize
                .requestMatchers(*signupPages).permitAll()
                .anyRequest().authenticated()
        }
        .sessionManagement { session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
        .addFilterBefore(jwtAuthenticationFilter, BasicAuthenticationFilter::class.java)
        .build()!!

    @Bean
    fun passwordEncoder() = BCryptPasswordEncoder()
}