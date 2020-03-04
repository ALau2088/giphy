import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      url: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ keyword: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${this.state.keyword}&api_key=DLCVuTK6KZExOS7JoMq82bi5MaI6EbWO&limit=1`
      )
      .then(res => {
        console.log(res);
        this.setState({
          url: res.data.data[0]['images']['downsized_large']['url']
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='App'>
        <h1>Rhumbix Programming Test</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            value={this.state.keyword}
            onChange={this.handleChange}
          />
          <input type='submit' value='Go' />
        </form>
        <div>{this.state.url}</div>
        <img src={this.state.url} alt='...loading' height='42' width='42' />
      </div>
    );
  }
}

export default App;
