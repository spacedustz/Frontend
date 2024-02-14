package skw.apiserver.entity.news

import jakarta.persistence.*

@Entity
data class News(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    var status: String? = null,
    var totalResults: Int? = null,

    @OneToMany(fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
    @JoinColumn(name = "news_id")
    var articles: List<Article>? = null
)