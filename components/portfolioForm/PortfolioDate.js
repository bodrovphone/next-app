import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { FormGroup, Label, Button } from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";

class PortfolioDate extends React.Component {
  constructor(props) {
    super(props);
    const dateValue = props.initialDate ? moment(props.initialDate) : moment();
    const isHidden = !props.initialDate;
    this.state = {
      dateValue,
      isHidden
    };
  }

  setFiledValueAndTouched = (date, touched) => {
    const {
      form: { setFieldValue, setFieldTouched },
      field: { name }
    } = this.props;

    setFieldValue(name, date, true);
    setFieldTouched(name, touched, true);
  };
  handleChange = date => {
    this.setState({
      dateValue: date
    });

    this.setFiledValueAndTouched(date, true);
  };

  toggleDate = date => {
    this.setState(state => {
      return { isHidden: !state.isHidden };
    });

    this.setFiledValueAndTouched(date, true);
  };

  render() {
    const {
      label,
      field,
      canBeDisabled,
      form: { touched, errors }
    } = this.props;
    const { isHidden, dateValue } = this.state;
    return (
      <FormGroup>
        <Label>{label}</Label>
        <div className="input-group">
          {isHidden ? null : (
            <DatePicker
              selected={dateValue}
              onChange={this.handleChange}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              maxDate={moment()}
              dropdownMode="select"
            />
          )}

          {touched[field.name] && errors[field.name] && (
            <div className="error">{errors[field.name]}</div>
          )}
        </div>
        {!isHidden && canBeDisabled ? (
          <Button onClick={() => this.toggleDate()}>
            Still working here...
          </Button>
        ) : isHidden && canBeDisabled ? (
          <>
            <span>Still working here</span>
            <Button onClick={() => this.toggleDate(dateValue)}>
              Set end date...
            </Button>
          </>
        ) : null}
      </FormGroup>
    );
  }
}

export default PortfolioDate;
