package skw.apiserver.controller

import lombok.RequiredArgsConstructor
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import skw.apiserver.dto.ApiResponse
import skw.apiserver.service.UserService

@PreAuthorize("hasAuthority('DEVELOPER')")
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
class AdminController(
    private val userService: UserService
) {
    companion object {
        private val log: Logger = LogManager.getLogger(this::class.java.name)
    }

    @GetMapping("/users")
    fun getAllUser() {
        ApiResponse.success(userService.getUsers())
    }

    @GetMapping("/admins")
    fun getAllAdmins() = ApiResponse.success(userService.getAdmins())
}