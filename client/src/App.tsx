import * as React from "react";
import "./index.css";
import { ChakraProvider, theme } from "@chakra-ui/react";

import styled from "@emotion/styled";
import Input from "./components/Input";
import ListItemComponent from "./components/ListItemComponent";
import TabComponent from "./components/TabComponent";
import MapComponent from "./components/map/MapComponent";
/* color: ${props =>
    props.primary ? 'hotpink' : 'turquoise'}; */

const Container = styled.div`
  display: grid;
  grid-template-columns: 35% 1fr;
  gap: 9px 0px;
  overflow: hidden;
  height: 100vh;
  /* transform: scaleX(-1); */

  @media (max-width: 767.98px) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  & .container__overlay {
    /* Position */
    left: 0;
    position: absolute;
    top: 0;

    /* Take full size */
    height: 100%;
    width: 100%;

    /* Center the content */
    align-items: center;
    display: flex;
    justify-content: center;

    /* Add a dark background */
    background-color: rgba(0, 0, 0, 0.25);
  }

  & .container__sidebar {
    overflow-x: hidden;
    overflow-y: auto;
    /* overflow: scroll; */
    align-items: center;
    grid-auto-flow: row;
    grid-auto-rows: 25%; // play with this to change height of the children, 50% will fill half
    grid-template-columns: unset; // do not set template columns and rows
    grid-template-rows: unset;
    position: relative;
    overflow-x: auto;
    width: 100%;
    height: auto;
    /* transform: scaleX(-1); */

    @media (max-width: 960px) {
      position: relative;
      overflow-x: hidden;
      width: 100%;
      height: 40%;
      grid-area: 1 / 1 / 6 / 6;
      min-width: 90%;
    }
  }
  & .container__main {
    grid-template-columns: 1fr;
    /* Take the remaining width */
    position: fixed;
    left: 35%;
    width: 100vw;
    height: 100%;
    overflow: hidden;

    @media (max-width: 960px) {
      /* bottom: 100%;
      height: 30%; */
      grid-area: 3 / 1 / 6 / 6;
      position: relative;
      left: 0;
      min-width: 90%;
    }

    /* Make it scrollable */
  }
`;

export const App = () => (
  <ChakraProvider theme={theme}>
    <div
      style={{
        padding: "0 1em",
        margin: "0 auto",
        overflow: "hidden",
        backgroundColor: "#FAF5FF",
      }}
      className="container-fluid"
    >
      <header> HELO</header>

      <TabComponent />
      <Container>
        {/* <div className="container__overlay">OVERLAY</div> */}
        {/* <!-- Sidebar --> */}
        <aside className="container   container__sidebar">
          {/* <Show /> */}
          <Input />
          <ListItemComponent />
          <ListItemComponent />
        </aside>

        {/* <!-- Main --> */}
        <main className="container-fluid container__main">
          {/* <div style={{ overflow: "hidden", width: "100% " }}>MAP</div> */}
          {/* <Map /> */}
          <MapComponent />
        </main>
      </Container>
    </div>
  </ChakraProvider>
);
