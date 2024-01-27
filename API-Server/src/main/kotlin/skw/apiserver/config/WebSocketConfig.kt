package skw.apiserver.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.config.annotation.*

@Configuration
@EnableWebSocket
class WebSocketConfig: WebSocketConfigurer {
    override fun registerWebSocketHandlers(registry: WebSocketHandlerRegistry) {
        registry
            .addHandler(CommentWebSocketHandler(), "/api/comment/list")
            .setAllowedOrigins("*")
    }
}