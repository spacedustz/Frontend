import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainTabs from "../components/MainTabs.tsx";
import Assignment from "../components/Assignment.tsx";
import CommentApp from "../components/Comment/CommentApp.tsx";
import NoteApp from "../components/note/NoteApp.tsx";
import Write from "../components/note/Write.tsx";
import View from "../components/note/View.tsx";
import Navigation from "../components/Navigation.tsx";
import ProfileCard from "../components/ProfileCard.tsx";

const Router: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <Navigation />
                <ProfileCard/>
                <Suspense fallback={<div>Loading...</div>}>
                    <MainTabs/>
                    <Routes>
                        <Route path="assignment" element={<Assignment/>}/>
                        <Route path="note/*" element={<NoteApp />}>
                            <Route path="write" element={<Write />} />
                            <Route path=":id" element={<View />} />
                        </Route>
                        <Route path="comment" element={<CommentApp/>}/>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
};

export default Router;