import React from "react";
import { AppHead } from "./AppHead";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./appLogedIn.css";

// Type Defination
interface TaskProps {
  task: string;
}

// Initial Values
const initialValues: TaskProps = {
  task: "",
};

export const AppLogedIn = () => {
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
          onSubmit={(values) => {
            console.log(values);
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
    </div>
  );
};
