package skw.apiserver.entity.news

import jakarta.persistence.*

@Entity
data class Article(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    @Embedded
    @AttributeOverride(name="id", column = Column(name="sourceId"))
    var source: Source? = null,

    var author: String? = null,
    var title: String? = null,
    @Column(length = 1000)
    var description: String? = null,
    var url: String? = null,
    var urlToImage: String? = null,
    var publishedAt: String? = null,

    @Column(length = 10000)
    var content: String? = null
)