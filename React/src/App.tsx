import React from "react";
import {RootContainer} from "./styles/container/RootContainer.ts";
import Router from "./router/Router.tsx";
import {AuthProvider} from "./components/auth/AutnContext.tsx";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <RootContainer>
                <Router/>
            </RootContainer>
        </AuthProvider>
    )
}

export default App;
