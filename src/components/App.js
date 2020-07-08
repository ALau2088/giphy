import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { YOUR_API_KEY } from '../config/config';

import Searchbar from './Searchbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      trending: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, keyword) {
    e.preventDefault();
    console.log('line 22', keyword);
    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${YOUR_API_KEY}&limit=1`
      )
      .then((res) => {
        console.log(res);
        this.setState({
          result: {
            title: res.data.data[0].title,
            url: res.data.data[0]['images']['original']['url'],
          },
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/trending?api_key=${YOUR_API_KEY}&limit=15`
      )
      .then((res) => {
        console.log('line 44', res);
        const gifs = res.data.data.map((gif) => {
          return {
            title: gif.title,
            url: gif.images.original.url,
          };
        });
        this.setState({ trending: gifs }, () =>
          console.log(this.state.trending)
        );
      })
      .catch((err) => console.log(err));
  }

  render() {
    console.log('line 64-render');
    const img = (
      <img
        src={this.state.result.url}
        alt='...loading'
        height='300'
        width='300'
      />
    );
    return (
      <div className='bg-light'>
        <div className='App container bg-light'>
          <h1>Giphs</h1>
          <Searchbar
            handleSubmit={this.handleSubmit}
            keyword={this.state.keyword}
          />

          <div>{this.state.url}</div>
          {this.state.result ? (
            <div className='d-block mx-auto'>
              {img}
              <div>{this.state.result.title}</div>
            </div>
          ) : (
            <div className='row m-4'>
              {this.state.trending.map((gif) => (
                <div className='col-4'>
                  <div className='card m-2' style={{ width: '18rem' }}>
                    <img
                      className='card-img-top'
                      src={gif.url}
                      alt='...loading'
                      height='300'
                      width='300'
                    />
                    <div className='card-body'>
                      <h5 className='card-title'>{gif.title}</h5>
                      <div className='d-flex justify-content-end'>
                        <div className='btn-group'>
                          <button className='btn btn-sm btn-outline-secondary'>
                            See More
                          </button>
                          <button className='btn btn-sm btn-outline-secondary'>
                            Get ShortUrl
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
