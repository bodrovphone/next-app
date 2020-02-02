// Render Prop
import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "reactstrap";
import PortfolioInput from "./PortfolioInput";
import PortfolioDate from "./PortfolioDate";

const validateInputs = values => {
  const errors = {};

  Object.keys(values).forEach(key => {
    if (
      !values[key] &&
      (values[key] === "startDate" || values[key] === "endDate")
    ) {
      errors[key] = `${key} is required field!`;
    }

    const { startDate, endDate } = values;
    if (startDate && endDate && endDate.isBefore(startDate)) {
      errors.endDate = `End can't be before start date!`;
    }
  });

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
            name="startDate"
            label="Started at:"
            component={PortfolioDate}
          />

          <Field
            id="endDate"
            name="endDate"
            label="Ended at:"
            canBeDisabled={true}
            component={PortfolioDate}
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
