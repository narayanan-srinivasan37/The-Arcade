import React from "react";
import NavBar from "../NavBar/NavBar";
import "./ComponentLayout.css";
import Bottomnavigation from "../BottomNavigation/BottomNavigation";
const ComponentLayout = (props) => {
  return (
    <div>
      <NavBar />
      <main className="main-content">
        <section className="section-content">{props.children}</section>
        <Bottomnavigation />
      </main>
    </div>
  );
};

export default ComponentLayout;
