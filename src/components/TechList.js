import React, { Component } from "react";
import TechItem from "./TechItem";

class TechList extends Component {
  state = {
    newTeach: "",
    techs: []
  };
  componentDidMount() {
    const techs = localStorage.getItem("techs");
    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  componentWillUnmount() {}
  handleImputChamge = e => {
    this.setState({ newTeach: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      techs: [...this.state.techs, this.state.newTeach],
      newTeach: ""
    });
  };

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h1>{this.state.newTeach}</h1>
          <ul>
            {this.state.techs.map(tech => (
              <TechItem
                key={tech}
                tech={tech}
                onDelete={() => this.handleDelete(tech)}
              />
            ))}
            <TechItem />
          </ul>
          <input
            type="text"
            onChange={this.handleImputChamge}
            value={this.state.newTeach}
          />
          <button type="submit">Enviar</button>
        </form>
      </>
    );
  }
}
export default TechList;
