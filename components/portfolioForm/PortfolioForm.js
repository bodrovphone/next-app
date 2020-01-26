// Render Prop
import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "reactstrap";
import PortfolioInput from "./PortfolioInput";

const validateInputs = values => {
  const errors = {};

  Object.keys(values)
    .forEach(key => {
      if (!values[key]) {
        errors[key] = `${key} is required field!`
      }
    })

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
          <Field
            id="title"
            type="text"
            name="title"
            label="Title:"
            component={PortfolioInput}
          />

          <Field
            id="company"
            className="form-control"
            type="text"
            name="company"
            label="Company:"
            component={PortfolioInput}
          />

          <Field
            id="location"
            className="form-control"
            type="text"
            name="location"
            label="Location:"
            component={PortfolioInput}
          />

          <Field
            id="position"
            className="form-control"
            type="text"
            name="position"
            label="Position:"
            component={PortfolioInput}
          />

          <Field
            id="description"
            className="form-control"
            type="textarea"
            name="description"
            label="Description:"
            component={PortfolioInput}
          />

          <Field
            id="startDate"
            className="form-control"
            type="text"
            name="startDate"
            label="Started at:"
            component={PortfolioInput}
          />

          <Field
            id="endDate"
            className="form-control"
            type="text"
            name="endDate"
            label="Ended at:"
            component={PortfolioInput}
          />

          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioForm;
