import React, {useEffect, useState} from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {ButtonStyle, List, ListContainer, RootContainer, SubContainer, Title} from "../../styles/note/Note.ts";
import {Note} from "../../model/Note.ts";
import {getAllNote} from "../../model/Api.ts";

const NoteApp: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const location = useLocation();

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await getAllNote();
            console.log(response.data)
            setNotes(response.data);
        };

        fetchNotes();
    }, []);

    const deleteNote = (id: number) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const categories = Array.from(new Set(notes.map((note) => note.category)));

    return (
        <div>
            {location.pathname === "/note" && (
                <RootContainer>
                    <ButtonStyle>
                        <Link to="write">작성</Link>
                    </ButtonStyle>

                    <SubContainer>
                        <Title>
                            <h4>공부 노트</h4>
                        </Title>

                        <ListContainer>
                            {categories.map((category) => (
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
                                                        {note.title}</Link>
                                                    <span>
                                                        <button onClick={() => deleteNote(note.id)}>삭제</button>
                                                    </span>
                                                </li>
                                            ))}
                                    </ul>
                                </List>
                            ))}
                        </ListContainer>
                    </SubContainer>
                </RootContainer>
            )}
            <Outlet/>
        </div>
    );
};

export default NoteApp;