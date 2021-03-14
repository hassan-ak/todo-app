import React, { useReducer } from "react";
import { AppHead } from "./AppHead";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IconButton, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./appLogedIn.css";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

interface TaskProps {
  task: string;
}

const initialValues: TaskProps = {
  task: "",
};

const todosReducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return [
        {
          id: Math.floor(Math.random() * 100000000000000),
          done: false,
          value: action.payload,
        },
        ...state,
      ];
    case "toggleTodoDone":
      const newState = [...state];
      newState[action.payload] = {
        done: !state[action.payload].done,
        value: state[action.payload].value,
      };
      return newState;
  }
};

export const AppLogedIn = () => {
  const [todos, dispatch] = useReducer(todosReducer, []);
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
          onSubmit={(values, onSubmitProps) => {
            dispatch({ type: "addTodo", payload: values.task });
            onSubmitProps.resetForm();
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
      {todos.length === 0 ? (
        <div className='taskScreen taskScreenE'>
          <p>No Todo's</p>
        </div>
      ) : (
        <div className='taskScreen'>
          {todos.map((todo, i) => (
            <div key={i}>
              <div className={todo.done ? "taskEntryA" : "taskEntry"}>
                <div
                  className='archieved'
                  onClick={() => {
                    dispatch({
                      type: "toggleTodoDone",
                      payload: i,
                    });
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
                <div className='contnet'>{todo.value}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
