import React from "react";
import {RootContainer} from "./styles/container/RootContainer.tsx";
import Navigation from "./styles/navigation/Navigation.tsx";
import Router from "./router/Router.tsx";
import ProfileCard from "./styles/card/ProfileCard.tsx";

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
