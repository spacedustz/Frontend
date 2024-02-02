import React from "react";
import {RootContainer} from "./styles/container/RootContainer.ts";
import Navigation from "./components/Navigation.tsx";
import Router from "./router/Router.tsx";
import ProfileCard from "./components/ProfileCard.tsx";

const App: React.FC = () => {
  return (
    <RootContainer>
      <Navigation />
        <ProfileCard />
        <Router />
    </RootContainer>
  )
}

export default App;
