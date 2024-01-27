package skw.apiserver.controller

import lombok.RequiredArgsConstructor
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import skw.apiserver.dto.*
import skw.apiserver.error.CommonException
import skw.apiserver.service.UserService

//@PreAuthorize("hasAuthority('USER')")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
class UserController(
    private val userService: UserService
) {
    companion object {
        private val log: Logger = LogManager.getLogger(this::class.java.name)
    }

    @PostMapping("/sign-up")
    fun signUp(@RequestBody request: SignUpRequest): ResponseEntity<SignUpResponse> {
        return try {
            log.info("${request.name} 유저가 회원가입을 하였습니다!")
            ResponseEntity(userService.signUpUser(request), HttpStatus.CREATED)
        } catch (e: Exception) {
            log.error("유저 회원가입 실패 - $e")
            throw CommonException("Sign-up Failed", HttpStatus.BAD_REQUEST)
        }
    }

    @PostMapping("/sign-in")
    fun signIn(@RequestBody request: SignInRequest): ResponseEntity<SignInResponse> {
        return try {
            log.info("${request.name} 유저가 로그인 하였습니다!")
            ResponseEntity(userService.signIn(request), HttpStatus.OK)
        } catch (e: Exception) {
            log.error("유저 로그인 실패 - $e")
            throw CommonException("Sign-in Failed", HttpStatus.BAD_REQUEST)
        }
    }

    @GetMapping("/{name}")
    fun checkDuplicateUserName(@PathVariable("name") name: String): ResponseEntity<Boolean> {
        val check = userService.checkDuplicateUserName(name)

        log.info("UserName 중복 검증 결과 - $check")
        return ResponseEntity(check, HttpStatus.OK)
    }
}