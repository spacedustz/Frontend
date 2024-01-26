package skw.apiserver.dto

data class SignUpRequest(
    val name: String,
    var password: String
)

data class SignInRequest(
    val name: String,
    var password: String
)

data class UpdateRequest(
    val name: String,
    var password: String,
    val newPassword: String? = null
)