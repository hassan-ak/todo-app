import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { TextField } from "@material-ui/core";
import { gql, useMutation, useQuery } from "@apollo/client";

// Type Defination
interface TaskProps {
  task: string;
}

// Initial Values
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
const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;

export const InputForm = () => {
  const [addTodo] = useMutation(ADD_TODO);
  const { refetch } = useQuery(GET_TODOS);
  return (
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
  );
};
