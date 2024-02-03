package skw.apiserver.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Lob

@Entity
data class Note(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    val title: String = "",
    @Lob
    @Column(length = 10000)
    val content: String = "",
    val category: String = ""
) {
    companion object {
        fun createOf(title: String, content: String, category: String) = Note(
            title = title,
            content = content,
            category = category
        )
    }
}