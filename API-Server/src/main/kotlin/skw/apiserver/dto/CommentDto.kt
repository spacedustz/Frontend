package skw.apiserver.dto

import skw.apiserver.enum.UserType

data class PostCommentDto(
    var userName: String,
    var description: String
)

data class UpdateCommentDto(
    var newDescription: String,
)

data class CommentListDto(
    var commentId: Long,
    var description: String,
    var createdAt: String,
    var userId: Long,
    var userName: String,
    var userType: String,
    var userCreatedAt: String,
)