import { Button } from "@material-ui/core";
import React from "react";
import "./landing.css";

export const Landing = () => {
  return (
    <div className='landingContainer'>
      <div className='landingContent'>
        <h1>Manage your Todo's</h1>
      </div>
      <div className='buttonDiv'>
        <Button
          className='landingButton'
          onClick={() => {
            alert("clicked");
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};
