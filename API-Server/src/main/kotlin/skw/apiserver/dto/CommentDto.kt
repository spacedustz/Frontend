package skw.apiserver.dto

data class PostCommentDto(
    var userName: String,
    var description: String
)

data class UpdateCommentDto(
    var newDescription: String,
    val password: String
)

data class DeleteCommentDto(
    var password: String
)

data class CommentListDto(
    var commentId: Long,
    var description: String,
    var createdAt: String,
    var userId: Long,
    var userName: String,
    var password: String,
    var userType: String,
    var userCreatedAt: String,
)