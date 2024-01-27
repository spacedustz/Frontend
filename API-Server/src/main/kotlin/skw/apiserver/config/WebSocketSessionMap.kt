//package skw.apiserver.config
//
//import org.apache.logging.log4j.LogManager
//import org.apache.logging.log4j.Logger
//import org.springframework.web.socket.CloseStatus
//import org.springframework.web.socket.WebSocketSession
//import org.springframework.web.socket.handler.TextWebSocketHandler
//import java.util.concurrent.ConcurrentHashMap
//
//class WebSocketSessionMap : TextWebSocketHandler() {
//    companion object {
//        val sessionMap: MutableMap<String, WebSocketSession> = ConcurrentHashMap()
//        private val log: Logger = LogManager.getLogger(this::class.java.name)
//    }
//
//    @Throws(Exception::class)
//    override fun afterConnectionEstablished(session: WebSocketSession) {
//        sessionMap[session.id] = session
//        log.info("Comment Socket 연결 - Session ID : ${session.id}")
//    }
//
//    @Throws(Exception::class)
//    override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
//        sessionMap.remove(session.id)
//        log.info("Comment Socket 종료 - Session ID : ${session.id}")
//    }
//}