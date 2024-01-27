package skw.apiserver.dto

import skw.apiserver.entity.User

data class SignUpRequest(
    val name: String,
    var password: String
) {
    companion object {
        fun createOf(name: String, password: String) = SignUpRequest(
            name = name,
            password = password
        )
    }
}

data class SignInRequest(
    val name: String,
    var password: String
)

data class UpdateRequest(
    val name: String,
    var password: String,
    val newPassword: String? = null
)