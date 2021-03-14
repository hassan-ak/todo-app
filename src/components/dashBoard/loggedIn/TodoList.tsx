import React from "react";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { IconButton } from "@material-ui/core";
import { gql, useMutation, useQuery } from "@apollo/client";

const UPDATE_TODO_DONE = gql`
  mutation UpdateTodoDone($id: ID!) {
    updateTodoDone(id: $id) {
      text
      done
    }
  }
`;
const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;

export const TodoList = () => {
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
  const { data, refetch } = useQuery(GET_TODOS);
  return (
    <div className='taskScreen'>
      {data.todos.map((todo) => (
        <div key={todo.id}>
          <div className={todo.done ? "taskEntryA" : "taskEntry"}>
            <div
              className='archieved'
              onClick={async () => {
                console.log("updateTodoDone");
                await updateTodoDone({ variables: { id: todo.id } });
                console.log("refetching");
                await refetch();
              }}
            >
              <IconButton>
                {todo.done ? (
                  <CheckBoxIcon style={{ color: "rgb(40, 218, 64)" }} />
                ) : (
                  <CheckBoxOutlineBlankIcon
                    style={{ color: "rgb(40, 218, 64)" }}
                  />
                )}
              </IconButton>
            </div>
            <div className='contnet'>{todo.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
