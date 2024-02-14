package skw.apiserver.dto

import skw.apiserver.entity.news.Source

data class NewsData(
    val status: String,
    val totalResults: Int,
    val articles: List<ArticleData>
)

data class ArticleData(
    val source: SourceData,
    val author: String?,
    val title: String?,
    val description: String?,
    val url: String?,
    val urlToImage: String?,
    val publishedAt: String?,
    val content: String?
)

data class SourceData(
    val id: String?,
    val name: String?
)

data class NewsResponse(
    var status: String? = null,
    var totalResults: Int? = null,
    var articles: List<ArticleResponse>? = null
)

data class ArticleResponse(
    var source: Source? = null,
    var author: String? = null,
    var title: String? = null,
    var description: String? = null,
    var url: String? = null,
    var urlToImage: String? = null,
    var publishedAt: String? = null,
    var content: String? = null
)