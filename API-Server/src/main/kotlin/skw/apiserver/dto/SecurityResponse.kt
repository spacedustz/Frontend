package skw.apiserver.dto

import skw.apiserver.entity.User
import skw.apiserver.enum.UserType
import java.time.LocalDateTime
import java.util.UUID

data class SignUpResponse(
    val id: Long,
    val name: String,
) {
    companion object {
        fun createOf(user: User) = SignUpResponse(
            id = user.id!!,
            name = user.name
        )
    }
}

data class SignInResponse(
    val name: String,
    val type: UserType,
    val token: String, // 로그인하면 토큰을 받을 수 있게 Response에 추가
    val password: String
)

data class UpdatePasswordResponse(
    val result: Boolean,
    val name: String,
    val modifiedAt: String
) {
    companion object {
        fun createOf(result: Boolean, user: User) = UpdatePasswordResponse(
            result = result,
            name = user.name,
            modifiedAt = user.modifiedAt!!
        )
    }
}

data class UserInfoResponse(
    val id: Long,
    val name: String,
    val type: UserType,
    val createdAt: String
) {
    companion object {
        fun from(user: User) = UserInfoResponse(
            id = user.id!!,
            name = user.name,
            type = user.type,
            createdAt = user.createdAt!!
        )
    }
}

data class UserDeleteResponse(
    val result: Boolean
)