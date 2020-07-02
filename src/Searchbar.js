import React, { Component } from 'react';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      autoComplete: [],
      history: this.props.history,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.autoComplete = this.autoComplete.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('line 18', this.state.keyword);
    this.props.handleSubmit(e, this.state.keyword);
  }

  autoComplete(str) {
    this.setState(
      {
        autoComplete: [],
      },
      () => {
        let result = [];
        for (let i = 0; i < this.state.history.length; i++) {
          let wordContainsPrefix = true;
          for (let j = 0; j < this.state.keyword.length; j++) {
            if (this.state.history[i][j] !== this.state.keyword[j]) {
              wordContainsPrefix = false;
            }
          }
          if (wordContainsPrefix === true) {
            result.push(this.state.history[i]);
          }
        }
        this.setState(
          {
            autoComplete: result,
          },
          () => console.log(this.state.autoComplete)
        );
      }
    );
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({ keyword: e.target.value }, () => {
      this.autoComplete(this.state.keyword);
    });
  }
  render() {
    return (
      <form className='mb-3' onSubmit={this.handleSubmit}>
        <div className='input-group'>
          <input
            className='form-control'
            type='text'
            value={this.state.keyword}
            onChange={this.handleChange}
          />

          <input
            className='input-group-append input-group-text'
            type='submit'
            value='Go'
          ></input>
        </div>
      </form>
    );
  }
}

export default Searchbar;