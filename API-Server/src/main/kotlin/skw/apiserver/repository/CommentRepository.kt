package skw.apiserver.repository

import org.springframework.data.jpa.repository.JpaRepository

interface CommentRepository : JpaRepository<skw.apiserver.entity.Comment, Long> {
}