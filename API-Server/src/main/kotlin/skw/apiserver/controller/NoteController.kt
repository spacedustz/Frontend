package skw.apiserver.controller

import lombok.RequiredArgsConstructor
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import skw.apiserver.dto.PostNoteDto
import skw.apiserver.entity.Note
import skw.apiserver.service.NoteService

@RestController
@RequestMapping("/api/note")
@RequiredArgsConstructor
class NoteController(
    private val noteService: NoteService
) {
    @PostMapping("/post")
    fun postNote(@RequestBody data: PostNoteDto): ResponseEntity<Unit> {
        return ResponseEntity(noteService.postNote(data), HttpStatus.CREATED)
    }

    @GetMapping("/list")
    fun getAllNote(): ResponseEntity<List<Note>> {
        return ResponseEntity(noteService.getAllNote(), HttpStatus.OK)
    }

    @DeleteMapping("/delete/{id}")
    fun deleteNote(@PathVariable id: Long) {
        noteService.deleteNote(id)
    }
}