import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

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
    return (
      <DatePicker
        selected={this.state.dateValue}
        onChange={this.handleChange}
      />
    );
  }
}

export default PortfolioDate;
