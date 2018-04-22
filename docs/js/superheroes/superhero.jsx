import React, { Component } from 'react';
import * as api from '../utils/api';

export class Superhero extends Component {
  constructor(props) {
    super();

    this.state = { superhero: null };
  }

  componentDidMount() {
    api.getSuperhero(this.props.match.params.id)
      .then(data => this.setState({ superhero: data }))
  }

  render() {
    return this.state.superhero
      ? <div>
          <p>Name: { this.state.superhero.superhero }</p>
          <p>First Appearance: { this.state.superhero.first_appearance }</p>
          <p>Publisher: { this.state.superhero.publisher }</p>
          <p>Alter Ego: { this.state.superhero.alter_ego }</p>
        </div>
      : <div> NO HERO </div>;
  }
}
