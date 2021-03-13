import Button from "@material-ui/core/Button/Button";
import { navigate } from "gatsby";
import React from "react";

export const AppLogedOut = () => {
  return (
    <div className='landingContainer'>
      <div className='landingContent'>
        <h1>You are not Signed In</h1>
      </div>
      <div className='landingContent'>
        <h3>Kindly go to Home Page and SignIn again</h3>
      </div>
      <div className='buttonDiv'>
        <Button
          className='landingButton'
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
      </div>
    </div>
  );
};
