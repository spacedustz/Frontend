package skw.apiserver.controller

import lombok.RequiredArgsConstructor
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import skw.apiserver.dto.ApiResponse
import skw.apiserver.dto.SignInRequest
import skw.apiserver.dto.SignUpRequest
import skw.apiserver.service.UserService

@PreAuthorize("hasAuthority('USER')")
@RestController
@RequestMapping
@RequiredArgsConstructor
class UserController(
    private val userService: UserService
) {
    companion object {
        private val log: Logger = LogManager.getLogger(this::class.java.name)
    }

    @PostMapping("/sign-up")
    fun signUp(@RequestBody request: SignUpRequest): ApiResponse {
        val response = ApiResponse.success(userService.signUpUser(request))
        log.info("${request.name} 유저가 회원가입을 하였습니다!")

        return response
    }

    @PostMapping("/sign-in")
    fun signIn(@RequestBody request: SignInRequest): ApiResponse {
        val response = ApiResponse.success(userService.signIn(request))
        log.info("${request.name} 유저가 로그인 하였습니다!")

        return response
    }
}