package skw.apiserver.service

import jakarta.annotation.PostConstruct
import lombok.RequiredArgsConstructor
import lombok.extern.slf4j.Slf4j
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import org.hibernate.boot.model.naming.IllegalIdentifierException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import skw.apiserver.dto.*
import skw.apiserver.entity.User
import skw.apiserver.enum.UserType
import skw.apiserver.repository.UserRepository
import skw.apiserver.token.TokenProvider

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
class UserService(
    private val userRepository: UserRepository,
    private val encoder: PasswordEncoder,
    private val tokenProvider: TokenProvider

) {
    companion object {
        private val log: Logger = LogManager.getLogger(this::class.java.name)
    }

    @PostConstruct
    fun init() {
        userRepository.save(User(null, "Developer", encoder.encode("1260"), type = UserType.DEVELOPER))
    }

    /* User 기능 */
    fun signUpUser(request: SignUpRequest) = SignUpResponse.createOf(
        try {
            userRepository.save(User.createOf(request, encoder))
        } catch (e: Exception) {
            log.error("이미 사용중인 아이디입니다.")
            throw IllegalArgumentException("이미 사용중인 아이디입니다.")
        }
    )

    fun signIn(request: SignInRequest): SignInResponse {
        val user = userRepository.findByName(request.name)
            ?.takeIf { encoder.matches(request.password, it.password) }
            ?: throw IllegalIdentifierException("아이디 또는 비밀번호가 일치하지 않습니다.")

        val token = tokenProvider.createToken("${user.id}:${user.type}")

        return SignInResponse(user.name, user.type, token)
    }

    fun updatePassword(id: Long, request: UpdateRequest): UpdatePasswordResponse {
        val user = userRepository.findByIdOrNull(id)
            ?.takeIf { encoder.matches(request.password, it.password) }
            ?: throw IllegalArgumentException("아이디 또는 비밀번호가 일치하지 않습니다.")

        user.changePassword(request, encoder)

        return UpdatePasswordResponse.createOf(true, user)
    }

    /* Admin 기능 */
    @Transactional(readOnly = true)
    fun getUsers(): List<UserInfoResponse> = userRepository.findAllByType(UserType.USER).map(UserInfoResponse::from)

    @Transactional(readOnly = true)
    fun getAdmins(): List<UserInfoResponse> = userRepository.findAllByType(UserType.DEVELOPER).map(UserInfoResponse::from)
}