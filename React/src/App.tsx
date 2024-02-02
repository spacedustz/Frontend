import React from "react";
import {RootContainer} from "./styles/container/RootContainer.ts";
import Navigation from "./components/Navigation.tsx";
import Router from "./router/Router.tsx";
import ProfileCard from "./components/ProfileCard.tsx";
import {AuthProvider} from "./components/auth/AutnContext.tsx";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <RootContainer>
                <Navigation/>
                <ProfileCard/>
                <Router/>
            </RootContainer>
        </AuthProvider>
    )
}

export default App;
