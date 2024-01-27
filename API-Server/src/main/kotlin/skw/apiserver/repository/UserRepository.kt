package skw.apiserver.repository

import org.springframework.data.jpa.repository.JpaRepository
import skw.apiserver.entity.User
import skw.apiserver.enum.UserType
import java.util.*

interface UserRepository : JpaRepository<User, Long> {
    fun findByName(name: String): Optional<User?>
    fun findAllByType(type: UserType): List<User>
}