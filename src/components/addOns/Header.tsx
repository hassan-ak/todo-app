import React from "react";
import { IconButton, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import "./header.css";
import { navigate } from "gatsby";

const Header = () => {
  return (
    <div className='root'>
      <AppBar position='static' elevation={1}>
        <Toolbar className='transparent'>
          <IconButton
            edge='start'
            aria-label='Todo App'
            onClick={() => {
              navigate("/");
            }}
          >
            <AssignmentIcon />
          </IconButton>
          <Typography variant='h5'>Todo's</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
