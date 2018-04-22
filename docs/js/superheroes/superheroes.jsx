import React, { Component } from 'react';
import * as api from '../utils/api';

export class Superheroes extends Component {
  constructor() {
    super();
    this.state = { superheroes: [] };
  }

  componentDidMount() {
    api.getSuperheroes()
      .then(data => this.setState({ superheroes: data }));
  }

  render() {
    return this.state.superheroes.length > 0
      ? (<ul>
        { this.state.superheroes.map(superhero =>
          <li key={superhero.id}>
            { superhero.superhero } ({ superhero.publisher })
            <Link to={`/superheroes/${superhero.id}`}> See </Link>
          </li>)
        }
      </ul>)
      : ''
  }
}
