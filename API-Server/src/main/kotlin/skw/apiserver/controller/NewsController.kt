package skw.apiserver.controller

import lombok.RequiredArgsConstructor
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import skw.apiserver.dto.NewsData
import skw.apiserver.dto.NewsResponse
import skw.apiserver.service.NewsService

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
class NewsController(
    private val newsService: NewsService
) {
    @GetMapping("/news")
    fun getAllNews(): List<NewsResponse> {
        return newsService.getAllNews()
    }

    @PostMapping("/news")
    fun postNews(@RequestBody data: NewsData) {
        newsService.saveNews(data)
    }
}