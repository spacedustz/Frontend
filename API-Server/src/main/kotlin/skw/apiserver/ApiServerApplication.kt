package skw.apiserver

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@EnableScheduling
@SpringBootApplication
class ApiServerApplication

fun main(args: Array<String>) {
	runApplication<ApiServerApplication>(*args)
}
