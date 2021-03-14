import React from "react";
import { AppHead } from "./loggedIn/AppHead";

import "./appLogedIn.css";

import { gql, useQuery } from "@apollo/client";
import { InputForm } from "./loggedIn/InputForm";
import { TodoList } from "./loggedIn/TodoList";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;

export const AppLogedIn = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  return (
    <div>
      <AppHead />
      <InputForm />
      {error ? (
        <div className='taskScreen taskScreenE'>
          <p>{error.message}</p>
        </div>
      ) : null}
      {loading ? (
        <div className='taskScreen taskScreenE'>
          <p>loading...</p>
        </div>
      ) : null}
      {!loading && !error && <TodoList />}
    </div>
  );
};
