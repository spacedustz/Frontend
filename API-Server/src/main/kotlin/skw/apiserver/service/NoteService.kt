package skw.apiserver.service

import lombok.RequiredArgsConstructor
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import skw.apiserver.dto.PostNoteDto
import skw.apiserver.entity.Note
import skw.apiserver.error.CommonException
import skw.apiserver.repository.NoteRepository

@Service
@Transactional
@RequiredArgsConstructor
class NoteService(
    private val noteRepository: NoteRepository
) {
    companion object {
        private val log: Logger = LogManager.getLogger(this::class.java.name)
    }

    fun postNote(data: PostNoteDto) {
        try {
            noteRepository.save(Note.createOf(data.title, data.content, data.category))
        } catch (e: Exception) {
            log.error("Note 생성 실패 - $e")
            throw CommonException("Note 생성 실패", HttpStatus.BAD_REQUEST)
        }
    }

    @Transactional(readOnly = true)
    fun getAllNote(): List<Note> {
        return try {
            noteRepository.findAll()
        } catch (e: Exception) {
            log.error("Note 전체 조회 실패 - $e")
            throw CommonException("Note 조회 실패", HttpStatus.BAD_REQUEST)
        }
    }
}