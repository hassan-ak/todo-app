import React from "react";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Todo's | Home</title>
      </Helmet>
      <div>Home Page</div>
    </div>
  );
}