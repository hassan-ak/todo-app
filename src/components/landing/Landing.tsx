import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";
import "./landing.css";
import { navigate } from "gatsby";

export const Landing = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    netlifyIdentity.init({});
  });
  netlifyIdentity.on("login", (user) => {
    netlifyIdentity.close();
    setUser(user.user_metadata.full_name);
  });
  netlifyIdentity.on("logout", () => {
    setUser("");
  });
  console.log();
  if (user === "") {
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
        <h1>Welcome {user}!</h1>
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
            netlifyIdentity.open();
          }}
        >
          LogOut
        </Button>
      </div>
    </div>
  );
};
