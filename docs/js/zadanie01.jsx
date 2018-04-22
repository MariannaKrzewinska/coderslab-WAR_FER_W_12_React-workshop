import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter, Route, Redirect } from 'react-router-dom';

let savedToken;

class Superheroes extends Component {
  constructor() {
    super();
    this.state = { superheroes: [] };
  }

  componentDidMount() {
    this.getSuperheroes()
  }

  getSuperheroes() {
    fetch('https:\/\/mk-super-heroes.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ email: 'some@email.com', password: 'Password1!' })
    })
      .then(resp => resp.json())
      .then(({ token }) => {
        savedToken = token;

        fetch('https:\/\/mk-super-heroes.herokuapp.com/superheroes', {
          headers: {
            Authorization: savedToken
          }
        })
          .then(data => data.json())
          .then(data => this.setState({ superheroes: data }))
      })
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
    fetch(`https:\/\/mk-super-heroes.herokuapp.com/superheroes/${this.props.match.params.id}`, {
      headers: {
        Authorization: savedToken
      }
    })
      .then(data => data.json())
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
  <BrowserRouter basename="/coderslab-WAR_FER_W_12_React-workshop">
    <App/>
  </BrowserRouter>,
  document.getElementById('app')
);

module.hot.accept();
