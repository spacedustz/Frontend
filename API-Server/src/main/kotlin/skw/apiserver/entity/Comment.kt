package skw.apiserver.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import lombok.NoArgsConstructor
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Entity
@NoArgsConstructor
data class Comment(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
//    var name: String,
//    var password: String,
    var description: String? = null,
    var createdAt: String? = null
) {
    constructor(description: String, createdAt: String) : this(null, description, createdAt)

    companion object {
        fun createOf(description: String): Comment {
            val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH시 mm분 ss초")
            return Comment(description, LocalDateTime.now().format(formatter).toString())
        }
    }
}