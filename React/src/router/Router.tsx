import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainTabs from "../components/MainTabs.tsx";
import CommentApp from "../components/Comment/CommentApp.tsx";
import NoteApp from "../components/note/NoteApp.tsx";
import Write from "../components/note/Write.tsx";
import View from "../components/note/View.tsx";
import Navigation from "../components/Navigation.tsx";
import ProfileCard from "../components/ProfileCard.tsx";
import AssignmentApp from "../components/note/AssignmentApp.tsx";

const Router: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <Navigation />
                <ProfileCard/>
                <Suspense fallback={<div>Loading...</div>}>
                    <MainTabs/>
                    <Routes>
                        {/*<Route path="assignment/*" element={<AssignmentApp/>}>*/}
                        {/*    <Route path="write" element={<Write />} />*/}
                        {/*    <Route path=":id" element={<View />} />*/}
                        {/*</Route>*/}
                        {/*<Route path="note/*" element={<NoteApp />}>*/}
                        {/*    <Route path="write" element={<Write />} />*/}
                        {/*    <Route path=":id" element={<View />} />*/}
                        {/*</Route>*/}
                        <Route path="assignment" element={<AssignmentApp/>} />
                        <Route path="assignment/write" element={<Write />} />
                        <Route path="assignment/:id" element={<View />} />
                        <Route path="note" element={<NoteApp />} />
                        <Route path="note/write" element={<Write />} />
                        <Route path="note/:id" element={<View />} />
                        <Route path="comment" element={<CommentApp/>}/>
                        <Route path="comment" element={<CommentApp/>}/>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
};

export default Router;