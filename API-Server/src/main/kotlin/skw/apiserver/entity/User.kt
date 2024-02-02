package skw.apiserver.entity

import jakarta.persistence.*
import org.springframework.security.crypto.password.PasswordEncoder
import skw.apiserver.dto.SignUpRequest
import skw.apiserver.dto.UpdateRequest
import skw.apiserver.enum.UserType
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Entity
class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false, scale = 20, unique = true)
    val name: String,

    @Column(nullable = false)
    var password: String,

    @Enumerated(EnumType.STRING)
    var type: UserType = UserType.유저,

    val createdAt: String? = "",
    var modifiedAt: String? = ""
) {
    companion object {
        private val formatter: DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH시 mm분 ss초")

        fun createOf(request: SignUpRequest, encoder: PasswordEncoder) = User(
            name = request.name,
            password = encoder.encode(request.password),
            createdAt =  LocalDateTime.now().format(formatter).toString()
        )
    }

    fun changePassword(newUser: UpdateRequest, encoder: PasswordEncoder) {
        val formatter: DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH시 mm분 ss초")

        this.password = newUser.newPassword?.takeIf { it.isNotBlank() }?.let { encoder.encode(it) }?: this.password
        this.modifiedAt = LocalDateTime.now().format(formatter).toString();
    }
}