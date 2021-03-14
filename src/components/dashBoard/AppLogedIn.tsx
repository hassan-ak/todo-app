import React from "react";
import { AppHead } from "./AppHead";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IconButton, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./appLogedIn.css";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { gql, useMutation, useQuery } from "@apollo/client";

interface TaskProps {
  task: string;
}

const initialValues: TaskProps = {
  task: "",
};

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
    }
  }
`;
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

export const AppLogedIn = () => {
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
  const { loading, error, data, refetch } = useQuery(GET_TODOS);
  return (
    <div>
      <AppHead />
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            task: Yup.string()
              .min(3, "Must be 3 characters or more")
              .max(15, "Must be 15 characters or less")
              .required("Kindly add a Todo"),
          })}
          onSubmit={async (values, onSubmitProps) => {
            await addTodo({ variables: { text: values.task } });
            onSubmitProps.resetForm();
            await refetch();
          }}
        >
          <Form className='formControl1'>
            <div className='fieldsDiv1'>
              <Field
                as={TextField}
                variant='outlined'
                className='fields'
                name='task'
                label="Your Todo's here"
                helperText={
                  <ErrorMessage name='task'>
                    {(msg) => <span className='error'>{msg}</span>}
                  </ErrorMessage>
                }
              />
            </div>
            <div className='btnDivF'>
              <Button
                style={{ color: "white" }}
                variant='contained'
                className='green'
                type='submit'
              >
                <AddCircleOutlineIcon />
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
      {error ? <div>{error.message}</div> : null}
      {loading ? <div>loading...</div> : null}
      {!loading && !error && (
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
      )}
    </div>
  );
};
