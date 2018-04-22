import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, HashRouter, Route, Redirect } from 'react-router-dom';

let savedToken;

const login = () => {
  return fetch('https:\/\/mk-super-heroes.herokuapp.com/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ email: 'some@email.com', password: 'Password1!' })
  })
    .then(resp => resp.json())
    .then(({ token }) => {
      savedToken = token;
      return { token };
    })
}

const getSuperheroes = () => {
  return (!savedToken
    ? login()
    : Promise.resolve({ token: savedToken }))
    .then(({ token }) => {

      fetch('https:\/\/mk-super-heroes.herokuapp.com/superheroes', {
        headers: {
          Authorization: savedToken
        }
      })
        .then(data => data.json())
    })
}

const getSuperhero = (id) => {
  return (!savedToken
    ? login()
    : Promise.resolve())
    .then(() => fetch(`https:\/\/mk-super-heroes.herokuapp.com/superheroes/${id}`, {
      headers: {
        Authorization: savedToken
      }
    })
      .then(data => data.json()))
}

class Superheroes extends Component {
  constructor() {
    super();
    this.state = { superheroes: [] };
  }

  componentDidMount() {
    getSuperheroes()
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

class Superhero extends Component {
  constructor(props) {
    super();

    this.state = { superhero: null };
  }

  componentDidMount() {
    getSuperhero(this.props.match.params.id)
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

class App extends Component {
  render() {
    return <div>
      <nav>
        <Link to="/superheroes">Superheroes</Link>
      </nav>
      <div>
        <Route exact path="/superheroes" component={Superheroes}/>
        <Route path="/superheroes/:id" component={Superhero}/>
      </div>
    </div>
  }
}

ReactDOM.render(
  <HashRouter>
    <App/>
  </HashRouter>,
  document.getElementById('app')
);

module.hot.accept();
