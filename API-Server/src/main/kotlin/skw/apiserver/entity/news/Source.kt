package skw.apiserver.entity.news

import jakarta.persistence.Embeddable

@Embeddable
data class Source(
    var id: String? = null,
    var name: String? = null
)