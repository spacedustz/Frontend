package skw.apiserver.service

import jakarta.annotation.PostConstruct
import lombok.RequiredArgsConstructor
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import skw.apiserver.entity.Comment
import skw.apiserver.repository.CommentRepository

@Service
@Transactional
@RequiredArgsConstructor
class CommentService(
    private val commentRepository: CommentRepository
) {

//    @PostConstruct
//    fun init() {
//        commentRepository.save(Comment.createOf("첫 댓글"))
//    }
}