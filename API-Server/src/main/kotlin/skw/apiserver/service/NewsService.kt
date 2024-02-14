package skw.apiserver.service

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import skw.apiserver.dto.ArticleResponse
import skw.apiserver.dto.NewsData
import skw.apiserver.dto.NewsResponse
import skw.apiserver.entity.news.Article
import skw.apiserver.entity.news.News
import skw.apiserver.entity.news.Source
import skw.apiserver.repository.ArticleRepository
import skw.apiserver.repository.NewsRepository

@Service
@Transactional
class NewsService(
    private val newsRepository: NewsRepository,
    private val articleRepository: ArticleRepository
) {
    fun saveNews(newsData: NewsData) {
        val articles = newsData.articles.map { articleData ->
            Article(
                source = Source(
                    id = articleData.source.id,
                    name = articleData.source.name
                ),
                author = articleData.author,
                title = articleData.title,
                description = articleData.description,
                url = articleData.url,
                urlToImage = articleData.urlToImage,
                publishedAt = articleData.publishedAt,
                content = articleData.content
            )
        }

        val savedArticles = articleRepository.saveAll(articles)

        val news = News(
            status = newsData.status,
            totalResults = newsData.totalResults,
            articles = savedArticles
        )

        // Save the news entity
        newsRepository.save(news)
    }

    @Transactional(readOnly = true)
    fun getAllNews(): List<NewsResponse> {
        val news = newsRepository.findAll().map { news ->
            NewsResponse(
                status = news.status,
                totalResults = news.totalResults,
                articles = news.articles?.map { article ->
                    ArticleResponse(
                        source = article.source,
                        author = article.author,
                        title = article.title,
                        description = article.description,
                        url = article.url,
                        urlToImage = article.urlToImage,
                        publishedAt = article.publishedAt,
                        content = article.content
                    )
                }
            )
        }

        return news;
    }
}