package skw.apiserver.repository

import org.springframework.data.jpa.repository.JpaRepository
import skw.apiserver.entity.news.Article

interface ArticleRepository : JpaRepository<Article, Long> {
}