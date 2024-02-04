import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {postNote} from "../../model/Api.ts";
import {PostNote} from "../../model/Note.ts";
import {CategorySelect, ContentTextarea, Header, SubmitButton, TitleInput} from "../../styles/note/Write.ts";

const Write: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('HTML & CSS');
    const navigate = useNavigate();

    const handleSubmit = () => {
        const note: PostNote = {
            title: title,
            content: content,
            category: category,
        };

        try {
            postNote(note).then(r => {
                if (r.status === 201) {
                    if (category === "Assignment") {
                        navigate('/assignment');
                    } else {
                        navigate('/note');
                    }
                    console.log("글 작성 성공!")
                } else {
                    console.error(`글 작성 실패`)
                }
            })
        } catch (error) {
            console.error(`글 작성 실패 - ${error}`)
        }
    };

    return (
        <div>
            <Header>
                <CategorySelect value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="HTML & CSS">HTML & CSS</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="React & TypeScript">React & TypeScript</option>
                    <option value="Assignment">Assignment</option>
                </CategorySelect>
                <TitleInput
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력 해주세요."
                />
                <SubmitButton onClick={handleSubmit}>제출</SubmitButton>
            </Header>
            <ContentTextarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
    );
};

export default Write;