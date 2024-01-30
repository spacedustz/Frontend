package skw.apiserver.token

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import lombok.RequiredArgsConstructor
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.PropertySource
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import skw.apiserver.error.CommonException
import java.sql.Timestamp
import java.time.Instant
import java.time.LocalDateTime
import java.time.temporal.ChronoUnit
import java.util.Date
import javax.crypto.spec.SecretKeySpec

@Service
@PropertySource("classpath:jwt.yml")
@RequiredArgsConstructor
class TokenProvider(
    @Value("\${secret-key}")
    private val secretKey: String,

    @Value("\${expiration-hours}")
    private val expirationHours: Long,

    @Value("\${issuer}")
    private val issuer: String
) {
    companion object {
        private val log: Logger = LogManager.getLogger(this::class.java.name)
    }

    /* userSpecification은 "userName:userType"의 형식을 받음 */
    fun createToken(userSpecification: String): String {
        return try {
            val token = Jwts.builder()
                .signWith(SecretKeySpec(secretKey.toByteArray(), SignatureAlgorithm.HS512.jcaName)) // HS512 알고리즘 / secretKey를 이용해 서명
                .setSubject(userSpecification) // 토큰의 Subject 설정
                .setIssuer(issuer) // 발급자
                .setIssuedAt(Timestamp.valueOf(LocalDateTime.now())) // 토큰 발급 시간
                .setExpiration(Date.from(Instant.now().plus(expirationHours, ChronoUnit.HOURS))) // 토큰 만료시간 설정 -> 3시간
                .compact() // 토큰 생성

            log.info("Token이 성공적으로 생성되었습니다. Token - $token")
            token
        } catch (e: Exception) {
            log.error("Token 생성이 실패 하였습니다. - $e")
            throw CommonException("Token 생성 실패", HttpStatus.FORBIDDEN)
        }

    }

    /**
     * Validate Token
     * createToken() 에서 받은 Subject 복호화해서 리턴
     */
    fun validateTokenAndGetSubject(token: String): String? {
        return try {
            val token = Jwts.parserBuilder()
                .setSigningKey(secretKey.toByteArray())
                .build()
                .parseClaimsJws(token)
                .body
                .subject

            log.info("Token 검증 완료!")
            token
        } catch (e: Exception) {
            log.error("Token 검증이 실패 하였습니다. - $e")
            throw CommonException("Token 검증 실패", HttpStatus.FORBIDDEN)
        }
    }
}