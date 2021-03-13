import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";
import "./landing.css";

export const Landing = () => {
  useEffect(() => {
    netlifyIdentity.init({});
  });
  return (
    <div className='landingContainer'>
      <div className='landingContent'>
        <h1>Manage your Todo's</h1>
      </div>
      <div className='buttonDiv'>
        <Button
          className='landingButton'
          onClick={() => {
            netlifyIdentity.open();
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};
