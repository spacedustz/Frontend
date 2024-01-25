import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderTabs from "../styles/tabs/HeaderTabs.tsx";
import Note from "../components/Note.tsx";
import Assignment from "../components/Assignment.tsx";

const Router: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/*" element={<HeaderTabs/>}>
                            <Route path="Assignment" element={<Assignment/>}/>
                            <Route path="Note" element={<Note/>}/>
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
};

export default Router;