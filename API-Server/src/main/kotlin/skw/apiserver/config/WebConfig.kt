package skw.apiserver.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfig : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
//            .allowedOrigins("http://43.202.203.180:3000")
            .allowedOrigins("http://localhost:7000")
            .allowedMethods("*")
            .allowedHeaders("*")
            .allowCredentials(true)
    }
}