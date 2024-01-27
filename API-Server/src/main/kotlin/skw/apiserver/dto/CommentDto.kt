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