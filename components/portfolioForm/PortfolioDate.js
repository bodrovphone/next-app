import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { FormGroup, Label } from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";

class PortfolioDate extends React.Component {
  state = {
    dateValue: moment()
  };

  handleChange = date => {
    this.setState({
      dateValue: date
    });
  };

  render() {
    const { label } = this.props;
    return (
      <FormGroup>
        <Label>{label}</Label>
        <div className="input-group">
          <DatePicker
            selected={this.state.dateValue}
            onChange={this.handleChange}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            maxDate={moment()}
            dropdownMode="select"
          />
        </div>
      </FormGroup>
    );
  }
}

export default PortfolioDate;
