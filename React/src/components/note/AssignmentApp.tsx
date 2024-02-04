import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {
    DeleteButton,
    List,
    ListContainer,
    PostButton,
    RootContainer,
    SubContainer,
    Title
} from "../../styles/note/Note.ts";
import {Note} from "../../model/Note.ts";
import {deleteNote, getAllNote} from "../../model/Api.ts";

const AssignmentApp: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const location = useLocation();

    const fetchNotes = async () => {
        const response = await getAllNote();
        setNotes(response.data);
    };

    useEffect(() => {
        fetchNotes();
    }, [location]);

    const handleDelete = async (id: number) => {
        if (sessionStorage.getItem('username') !== '신건우') {
            alert('개발자 전용 메뉴입니다.');
        } else {
            try {
                await deleteNote(id);
                setNotes(notes.filter(note => note.id !== id))
                fetchNotes()
            } catch (error) {
                console.error("Note 삭제 실패")
            }
        }
    };

    const displayCategories = ["Assignment"];
    const title = "📚 과제 📚";

    return (
        <div>
            <RootContainer>
                <Title>
                    <h4>{title}</h4>
                </Title>

                <SubContainer>
                    <PostButton>
                        <Link
                            onClick={(e) => {
                                e.persist()
                                if (sessionStorage.getItem('username') !== '신건우') {
                                    e.preventDefault();
                                    alert('개발자 전용 메뉴입니다.');
                                }
                            }}
                            style={{textDecoration: 'none', color: 'white'}}
                            to="write">메모 작성</Link>
                    </PostButton>

                    <ListContainer>
                        {displayCategories.map((category) => (
                            <List key={category}>
                                <h4>{category}</h4>

                                <ul>
                                    {notes
                                        .filter((note) => note.category === category)
                                        .map((note, index) => (
                                            <li key={index}>
                                                <Link
                                                    to={`${note.id}`}
                                                    onClick={() => localStorage.setItem(String(note.id), JSON.stringify(note))}
                                                >
                                                    📄 {note.title}</Link>
                                                <span>
                                                    {sessionStorage.getItem('username') === '신건우' && (
                                                        <DeleteButton
                                                            onClick={() => handleDelete(note.id)}>삭제</DeleteButton>
                                                    )}
                                                </span>
                                            </li>
                                        ))}
                                </ul>
                            </List>
                        ))}
                    </ListContainer>
                </SubContainer>
            </RootContainer>
            {/*<Outlet/>*/}
        </div>
    );
};

export default AssignmentApp;