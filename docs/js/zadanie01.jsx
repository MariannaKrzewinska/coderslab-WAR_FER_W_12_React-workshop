import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, HashRouter, Route, Redirect } from 'react-router-dom';

import { Superheroes } from './superheroes/superheroes';
import { Superhero } from './superheroes/superhero';
import { SimpleDots } from './svg/simple-dots';

class App extends Component {
  render() {
    return <div>
      <nav>
        <Link to="/superheroes">Superheroes</Link>
        <Link to="/dots">Dots</Link>
      </nav>
      <div>
        <Route exact path="/superheroes" component={Superheroes}/>
        <Route exact path="/dots" component={SimpleDots}/>
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
