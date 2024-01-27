package skw.apiserver.filter

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import org.springframework.core.annotation.Order
import org.springframework.http.HttpHeaders
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.User
import org.springframework.security.web.authentication.WebAuthenticationDetails
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import skw.apiserver.token.TokenProvider

/**
 * @Order : 의존성 주입 우선순위 최상위로 설정
 */
@Order(5)
@Component
class JwtAuthenticationFilter(
    private val tokenProvider: TokenProvider
) : OncePerRequestFilter() {
    companion object {
        private val log: Logger = LogManager.getLogger(this::class.java.name)
    }

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val requestURI = request.requestURI
        log.info("Request URL : $requestURI")

        if (requestURI.endsWith("/") ||
            requestURI.endsWith( "/api/user/sign-in") ||
            requestURI.endsWith("/api/user/sign-up") ||
            requestURI.endsWith("/api/comment")) {
            filterChain.doFilter(request, response)
            return
        }

        val token = parseBearerToken(request)

        if (token != null && tokenProvider.validateTokenAndGetSubject(token) != null) {
            val user = parseUserSpecification(token)
            val authenticationToken = UsernamePasswordAuthenticationToken.authenticated(
                user,
                token,
                user.authorities
                    .apply { WebAuthenticationDetails(request) }
            )
            SecurityContextHolder.getContext().authentication = authenticationToken
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized")
            log.error("토큰이 없거나 유효하지 않은 토큰입니다. - Authorization Header : ${request.getHeader(HttpHeaders.AUTHORIZATION)}")
            return
        }

        filterChain.doFilter(request, response)
    }

    /**
     * Token Type 검증, 접두어를 제외한 토큰값 파싱, 검증 실패 시 null 반환
     */
    private fun parseBearerToken(request: HttpServletRequest): String? {
        val authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION)
        return try {
            authorizationHeader?.takeIf { it.startsWith("Bearer", true) }?.substring(7)
        } catch (e: Exception) {
            log.error("Error Parsing Bearer Token - Authorization Header : $authorizationHeader", e)
            null
        }
    }

    /**
     * User Name, Type을 기반으로 User 객체 반환, 토큰의 null 여부 & 토큰 길이 검증
     * 비밀번호는 로그인 API를 호출할 때 검증을 했으므로 빈 문자열을 넘김
     */
    private fun parseUserSpecification(token: String?) = try {
        val subject = token
            ?.takeIf { it.length >= 10 }
            ?.let { tokenProvider.validateTokenAndGetSubject(it) }
            ?: "anonymous:anonymous"

        val userInfo = subject.split(":")
        User(userInfo[0], "", listOf(SimpleGrantedAuthority(userInfo[1])))
    } catch (e: Exception) {
        log.error("Error Parsing User Specification from Token - Token : $token", e)

        // 예외 발생 시 기본값으로 익명 사용자 생성
        User("anonymous", "", emptyList())
    }
}