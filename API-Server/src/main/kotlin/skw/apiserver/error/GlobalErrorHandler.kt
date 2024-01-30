package skw.apiserver.error

import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

open class CommonException(
    message: String,
    val status: HttpStatus
) : RuntimeException("[Code] - ${status.value()} ${status.name}, [Message] - $message")

open class CommonExceptionResponse(
    val code: Int,
    val message: String
)

@RestControllerAdvice
class GlobalErrorHandler {
    @ExceptionHandler(CommonException::class)
    fun commonExceptionHandler(e: CommonException): ResponseEntity<CommonExceptionResponse> {
        val error = CommonExceptionResponse(code = e.status.value(), message = e.message ?: "")
//        return ResponseEntity(error, e.status)
        return ResponseEntity.status(e.status).body(error)
    }

    companion object {
        private val log: Logger = LogManager.getLogger(GlobalErrorHandler::class.java)
    }
}