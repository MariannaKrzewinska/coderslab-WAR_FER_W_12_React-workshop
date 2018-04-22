import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class BookInfo extends Component {
  constructor(props) {
    super();
    this.state = { title: null };
  }

  componentDidMount() {
    if ( !this.props.isbn ) { return null; }

    fetch(`https:\/\/www.googleapis.com/books/v1/volumes?q=isbn:${this.props.isbn}`)
      .then(data => data.json())
      .then(data => data.items[0].volumeInfo.title)
      .then(title => this.setState({ title }))
  }

  render () { return this.state.title
    ? <h1>{ this.state.title }</h1>
    : <h1> NO BOOK </h1>; }
}

ReactDOM.render(
  <BookInfo isbn='0747532699' />,
  document.getElementById('app')
);

module.hot.accept();
