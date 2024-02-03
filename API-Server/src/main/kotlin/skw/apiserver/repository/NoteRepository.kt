package skw.apiserver.repository

import org.springframework.data.jpa.repository.JpaRepository
import skw.apiserver.entity.Note

interface NoteRepository : JpaRepository<Note, Long> {
}