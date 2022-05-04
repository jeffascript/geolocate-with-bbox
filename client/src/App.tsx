import React from "react";
import "./index.css";

import Input from "./components/input/Input";
import ListItemComponent from "./components/list/ListItemComponent";
import TabComponent from "./components/tab/TabComponent";
import MapComponent from "./components/map/MapComponent";
import ListDetailComponent from "./components/list/ListDetailComponent";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { StyledContainer, SubContainer } from "./App.styles";

export const App = () => {
  const { oneFeature } = useSelector((state: RootState) => state.oneFeature);

  return (
    <SubContainer className="container-fluid">
      <TabComponent />
      <StyledContainer>
        {!!oneFeature.length && (
          <div className="container__overlay">
            <ListDetailComponent />
          </div>
        )}
        {/* <!-- Sidebar --> */}
        <aside className="container   container__sidebar">
          <Input />
          <ListItemComponent />
        </aside>

        {/* <!-- Main --> */}
        <main className="container-fluid container__main">
          <MapComponent />
        </main>
      </StyledContainer>
    </SubContainer>
  );
};
