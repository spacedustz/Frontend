package skw.apiserver.service

import jakarta.annotation.PostConstruct
import lombok.RequiredArgsConstructor
import lombok.extern.slf4j.Slf4j
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import org.hibernate.boot.model.naming.IllegalIdentifierException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import skw.apiserver.dto.*
import skw.apiserver.entity.User
import skw.apiserver.enum.UserType
import skw.apiserver.error.CommonException
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
        val signup: SignUpRequest = SignUpRequest.createOf("Developer", "1260")
        val developer = User.createOf(signup, encoder)
        developer.type = UserType.DEVELOPER
        userRepository.save(developer)
    }

    /* User 기능 */
    fun signUpUser(request: SignUpRequest) = SignUpResponse.createOf(
        try {
            userRepository.save(User.createOf(request, encoder))
        } catch (e: Exception) {
            log.error("이미 존재하는 이름입니다.")
            throw CommonException("이미 존재하는 이름입니다", HttpStatus.BAD_REQUEST)
        }
    )

    fun signIn(request: SignInRequest): SignInResponse {
        val user = userRepository.findByName(request.name)
            .filter { encoder.matches(request.password, it?.password) }
            .orElseThrow { CommonException("아이디 또는 비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST) }

        val token = tokenProvider.createToken("${user!!.id}:${user.type}")

        return SignInResponse(user.name, user.type, token, user.password)
    }

    @Transactional(readOnly = true)
    fun checkDuplicateUserName(name: String): Boolean {
        try {
            val optUser = userRepository.findByName(name)
            return optUser.isPresent
        } catch (e: Exception) {
            log.error("이미 존재하는 이름입니다.")
            throw CommonException("이미 존재하는 이름입니다.", HttpStatus.BAD_REQUEST)
        }
    }

    fun updatePassword(id: Long, request: UpdateRequest): UpdatePasswordResponse {
        val user = userRepository.findByIdOrNull(id)
            ?.takeIf { encoder.matches(request.password, it.password) }
            ?: throw CommonException("아이디 또는 비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST)

        user.changePassword(request, encoder)

        return UpdatePasswordResponse.createOf(true, user)
    }

    /* Admin 기능 */
    @Transactional(readOnly = true)
    fun getUsers(): List<UserInfoResponse> = userRepository.findAllByType(UserType.USER).map(UserInfoResponse::from)

    @Transactional(readOnly = true)
    fun getAdmins(): List<UserInfoResponse> = userRepository.findAllByType(UserType.DEVELOPER).map(UserInfoResponse::from)
}