import React from "react";
import Header from "../Common/Header";
import FooterComponent from "../Common/Footer";
export default function Home() {
  return (
    <div className="main">
      <Header />
      <p>home page</p>
      {console.log("home page")}
      <FooterComponent />
    </div>
  );
}
