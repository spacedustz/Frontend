import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import MainTabs from "../components/MainTabs.tsx";
import CommentApp from "../components/comment/CommentApp.tsx";
import NoteApp from "../components/note/NoteApp.tsx";
import Write from "../components/note/Write.tsx";
import View from "../components/note/View.tsx";
import Navigation from "../components/Navigation.tsx";
import ProfileCard from "../components/ProfileCard.tsx";
import AssignmentApp from "../components/note/AssignmentApp.tsx";
import NumberGuess from "../components/assignment/NumberGuess.tsx";
import TodoApp from "../components/assignment/TodoApp.tsx";
import NewsApp from "../components/assignment/NewsApp.tsx";

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routing/>
        </BrowserRouter>
    );
};

const Routing: React.FC = () => {
    const location = useLocation();
    const isSpecialApp = ['/news', '/number', '/todo'].includes(location.pathname);

    return (
        <>
            <Navigation/>
            {isSpecialApp ? (
                <Routes>
                    <Route path="/news" element={<NewsApp/>}/>
                    <Route path="/number" element={<NumberGuess/>}/>
                    <Route path="/todo" element={<TodoApp/>}/>
                </Routes>
            ) : (
                <>
                    <ProfileCard/>
                    <Suspense fallback={<div>Loading...</div>}>
                        <MainTabs/>
                        <Routes>
                            <Route path="assignment" element={<AssignmentApp/>}/>
                            <Route path="assignment/write" element={<Write/>}/>
                            <Route path="assignment/:id" element={<View/>}/>

                            <Route path="note" element={<NoteApp/>}/>
                            <Route path="note/write" element={<Write/>}/>
                            <Route path="note/:id" element={<View/>}/>

                            <Route path="comment" element={<CommentApp/>}/>
                        </Routes>
                    </Suspense>
                </>
            )}
        </>
    );
};

export default Router;