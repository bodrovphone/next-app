import { Component } from "react";

class PortfolioForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "", lang: "" };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    alert(
      `Congratulation! You have submittedo
       a new portfolioOso with these data: 

        ${this.state.title}
        ${this.state.lang}
        ${this.state.description}`
    );
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <br />
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <br />
          <textarea
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          ></textarea>
        </label>
        <br />
        <label>
          Language:
          <br />
          <select
            value={this.state.lang}
            name="lang"
            onChange={this.handleChange}
          >
            <option value="JS">JavaScripto</option>
            <option value="PT">Pythonio</option>
            <option value="HTML">HTML</option>
            <option value="RU">Rusish</option>
          </select>
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default PortfolioForm;
