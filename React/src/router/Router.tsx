import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainTabs from "../components/MainTabs.tsx";
import Note from "../components/Note.tsx";
import Assignment from "../components/Assignment.tsx";
import CommentApp from "../components/Comment/CommentApp.tsx";

const Router: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <MainTabs />
                    <Routes>
                            <Route path="Assignment" element={<Assignment/>}/>
                            <Route path="Note" element={<Note/>}/>
                            <Route path="Comment" element={<CommentApp />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
};

export default Router;