// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, FormGroup, Label } from "reactstrap";

const validateInputs = values => {
  const errors = {};
  // if (!values.email) {
  //   errors.email = "Required";
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
  //   errors.email = "Invalid email address";
  // }

  return errors;
};

const INITIAL_VALUES = {
  title: "",
  company: "",
  location: "",
  position: "",
  startDate: "",
  endDate: ""
};

const PortfolioForm = props => (
  <div>
    <Formik
      initialValues={INITIAL_VALUES}
      validate={validateInputs}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormGroup>
            <Label for="title">Title:</Label>
            <Field
              id="title"
              className="form-control"
              type="text"
              name="title"
            />
            <ErrorMessage name="title" component="div" />
          </FormGroup>

          <FormGroup>
            <Label for="company">Company:</Label>
            <Field
              id="company"
              className="form-control"
              type="text"
              name="company"
            />
            <ErrorMessage name="company" component="div" />
          </FormGroup>

          <FormGroup>
            <Label for="location">Location:</Label>
            <Field
              id="location"
              className="form-control"
              type="text"
              name="location"
            />
            <ErrorMessage name="location" component="div" />
          </FormGroup>

          <FormGroup>
            <Label for="position">Position:</Label>
            <Field
              id="position"
              className="form-control"
              type="text"
              name="position"
            />
            <ErrorMessage name="position" component="div" />
          </FormGroup>

          <FormGroup>
            <Label for="description">Description:</Label>
            <Field
              id="description"
              className="form-control"
              type="textarea"
              name="description"
              component="textarea"
            />
            <ErrorMessage name="description" component="div" />
          </FormGroup>

          <FormGroup>
            <Label for="startDate">Started at:</Label>
            <Field
              id="startDate"
              className="form-control"
              type="text"
              name="startDate"
            />
            <ErrorMessage name="startDate" component="div" />
          </FormGroup>

          <FormGroup>
            <Label for="endDate">Ended at:</Label>
            <Field
              id="endDate"
              className="form-control"
              type="text"
              name="endDate"
            />
            <ErrorMessage name="endDate" component="div" />
          </FormGroup>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioForm;
