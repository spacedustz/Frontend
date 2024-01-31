package skw.apiserver.controller

import lombok.RequiredArgsConstructor
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity

import org.springframework.web.bind.annotation.*
import skw.apiserver.dto.CommentListDto
import skw.apiserver.dto.DeleteCommentDto
import skw.apiserver.dto.PostCommentDto
import skw.apiserver.dto.UpdateCommentDto
import skw.apiserver.entity.Comment
import skw.apiserver.service.CommentService

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
class CommentController(
    private val commentService: CommentService
) {
    @PostMapping("/post")
    fun writeComment(@RequestBody request: PostCommentDto): ResponseEntity<Comment> {
        return ResponseEntity(commentService.writeComment(request.userName, request.description), HttpStatus.CREATED)
    }

    @PatchMapping("/update/{commentId}")
    fun updateComment(@PathVariable commentId: Long, @RequestBody request: UpdateCommentDto): ResponseEntity<Comment> {
        return ResponseEntity(commentService.updateComment(commentId, request.newDescription, request.password), HttpStatus.OK)

    }

    @DeleteMapping("/delete/{commentId}")
    fun deleteComment(@PathVariable commentId: Long, @RequestBody request: DeleteCommentDto): ResponseEntity<Unit> {
        return ResponseEntity(commentService.deleteComment(commentId, request.password), HttpStatus.OK)
    }

    @GetMapping
    fun getAllComments(): ResponseEntity<List<CommentListDto>> {
        return ResponseEntity(commentService.getAllComments(), HttpStatus.OK)
    }
}