package skw.apiserver.repository

import org.springframework.data.jpa.repository.JpaRepository
import skw.apiserver.entity.news.News

interface NewsRepository : JpaRepository<News, Long> {
}