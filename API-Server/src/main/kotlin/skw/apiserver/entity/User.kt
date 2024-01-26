package skw.apiserver.entity

import jakarta.persistence.*
import org.springframework.security.crypto.password.PasswordEncoder
import skw.apiserver.dto.SignUpRequest
import skw.apiserver.dto.UpdateRequest
import skw.apiserver.enum.UserType
import java.time.LocalDateTime

@Entity
class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false, scale = 20, unique = true)
    val name: String,

    @Column(nullable = false)
    var password: String,

    @Enumerated(EnumType.STRING)
    val type: UserType = UserType.USER,

    val createdAt: LocalDateTime = LocalDateTime.now(),
    var modifiedAt: LocalDateTime? = null
) {
    companion object {
        fun createOf(request: SignUpRequest, encoder: PasswordEncoder) = User(
            name = request.name,
            password = encoder.encode(request.password)
        )
    }

    fun changePassword(newUser: UpdateRequest, encoder: PasswordEncoder) {
        this.password = newUser.newPassword?.takeIf { it.isNotBlank() }?.let { encoder.encode(it) }?: this.password
        this.modifiedAt = LocalDateTime.now();
    }
}