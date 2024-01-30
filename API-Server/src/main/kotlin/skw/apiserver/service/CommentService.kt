package skw.apiserver.service

import jakarta.annotation.PostConstruct
import lombok.RequiredArgsConstructor
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import org.springframework.http.HttpStatus
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import skw.apiserver.dto.CommentListDto
import skw.apiserver.entity.Comment
import skw.apiserver.entity.User
import skw.apiserver.error.CommonException
import skw.apiserver.repository.CommentRepository
import skw.apiserver.repository.UserRepository
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Service
@Transactional
@RequiredArgsConstructor
class CommentService(
    private val commentRepository: CommentRepository,
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val socketChannel: SimpMessagingTemplate
) {
    companion object {
        private val log: Logger = LogManager.getLogger(this::class.java.name)
    }

    @PostConstruct
    fun init() {
        val developer: User = userRepository.findById(1L).orElseThrow()
        commentRepository.save(Comment.createOf("첫 댓글", developer))
    }

    fun writeComment(userName: String, description: String): Comment {
        val user = try {
            userRepository.findByName(userName)
                .orElseThrow { CommonException("Invalid UserName", HttpStatus.BAD_REQUEST) }
        } catch (e: Exception) {
            log.error("댓글 작성 에러 : $e")
            throw CommonException("비밀번호가 틀립니다.", HttpStatus.BAD_REQUEST)
        }

        val newComment = commentRepository.save(Comment.createOf(description, user!!))

        getAllComments()
        return newComment
    }

    fun updateComment(commentId: Long, newDescription: String, password: String): Comment {
        val comment = try {
            commentRepository.findById(commentId)
                .orElseThrow { CommonException("Invalid Comment ID", HttpStatus.BAD_REQUEST) }
        } catch (e: Exception) {
            log.error("댓글 수정 에러 : $e")
            throw CommonException("댓글 수정 에러", HttpStatus.BAD_REQUEST)
        }

        if (!passwordEncoder.matches(password, comment.user?.password))
            throw CommonException("Invalid Password", HttpStatus.BAD_REQUEST)

        comment.description = newDescription
        comment.createdAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH시 mm분 ss초")).toString()
        val updatedComment = commentRepository.save(comment)

        getAllComments()
        return updatedComment
    }

    fun deleteComment(commentId: Long, password: String) {
        val comment = try {
            commentRepository.findById(commentId)
                .orElseThrow { CommonException("Invalid Comment ID", HttpStatus.BAD_REQUEST) }
        } catch (e: Exception) {
            log.error("댓글 삭제 에러 : $e")
            throw CommonException("댓글 삭제 에러", HttpStatus.BAD_REQUEST)
        }

        if (!passwordEncoder.matches(password, comment.user?.password))
            throw CommonException("비밀번호가 틀립니다.", HttpStatus.BAD_REQUEST)

        commentRepository.delete(comment)
        getAllComments()
    }

    @Transactional(readOnly = true)
    fun getAllComments() {
        val comments = try {
            commentRepository.findAll()
        } catch (e: Exception) {
            log.error("댓글 리스트 조회 실패 - $e")
            throw CommonException("댓글 리스트 조회 실패", HttpStatus.BAD_REQUEST)
        }

        val commentListDtos = comments.map { comment ->
            CommentListDto(
                commentId = comment.id ?: 0,
                description = comment.description ?: "",
                createdAt = comment.createdAt ?: "",
                userId = comment.user?.id ?: 0,
                userName = comment.user?.name ?: "",
                password = comment.user?.password ?: "",
                userType = comment.user?.type?.name ?: "",
                userCreatedAt = comment.user?.createdAt ?: ""
            )
        }

        socketChannel.convertAndSend("/api/comment/list", commentListDtos)
        log.info("WebSocket - Comment List 전송 완료")
    }
}