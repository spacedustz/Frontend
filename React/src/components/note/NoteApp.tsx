import React, {useEffect, useState} from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {ButtonStyle, List, ListContainer, RootContainer, SubContainer, Title} from "../../styles/note/Note.ts";
import {Note} from "../../model/Note.ts";

const NoteApp: React.FC = () => {
    const [note, setNote] = useState<Note[]>([]);
    const location = useLocation();

    // const handleClick = () => {
    //     sessionStorage.getItem('key')
    //     navigate(`/note/${}`)
    // }

    useEffect(() => {
        const storedNotes = Object.keys(localStorage).map((key) => {
            const content = localStorage.getItem(key) || '{}';

            return {
                title: key,
                content: content
            }
        });
        setNote(storedNotes);
    }, []);

    const deleteNote = (title: string) => {
        localStorage.removeItem(title);
        setNote(note.filter(note => note.title !== title));
    };

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
                            <List>
                                <h4>HTML & CSS</h4>

                                <ul>
                                    {note.map((note, index) => (
                                        <li key={index}>
                                            <Link to={`${note.title}`}>{note.title}</Link>
                                            <span>
                                    <button onClick={() => deleteNote(note.title)}>삭제</button>
                                </span>
                                        </li>
                                    ))}
                                </ul>
                            </List>

                            <List>
                                <h4>JavaScript</h4>

                                <ul>
                                    {note.map((note, index) => (
                                        <li key={index}>
                                            <Link to={`${note.title}`}>{note.title}</Link>
                                            <span>
                                    <button onClick={() => deleteNote(note.title)}>삭제</button>
                                </span>
                                        </li>
                                    ))}
                                </ul>
                            </List>
                        </ListContainer>
                    </SubContainer>
                </RootContainer>
            )}

            <Outlet/>
        </div>
    );
};

export default NoteApp;