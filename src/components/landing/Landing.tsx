import { Button } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import "./landing.css";
import { navigate } from "gatsby";
import { IdentityContext } from "../../../identity-context";

export const Landing = () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  if (user === undefined) {
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
  }
  return (
    <div className='landingContainer'>
      <div className='landingContent'>
        <h1>Welcome {user.user_metadata.full_name}!</h1>
      </div>
      <div className='landingContent'>
        <h3>Manage your Todo's</h3>
      </div>
      <div className='buttonDiv'>
        <Button
          className='landingButton'
          onClick={() => {
            navigate("/app");
          }}
        >
          DashBoard
        </Button>
      </div>
      <div className='buttonDiv'>
        <Button
          className='landingButton'
          onClick={() => {
            netlifyIdentity.logout();
          }}
        >
          LogOut
        </Button>
      </div>
    </div>
  );
};
