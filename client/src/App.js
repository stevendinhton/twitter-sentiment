import React, { Component } from 'react';
import config from './config.json';
import request from 'request';
import './App.css';
import { Form, Button, Container, Row, Col, FormControl, InputGroup, ProgressBar } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      simpleResult: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  searchisEmpty() {
    return this.state.search === "";
  }

  handleChange(event) {
    this.setState({search: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.search === "") { return }
    var self = this;
    request({url: config.url + this.state.search, json: true}, function (error, response, body) {
      self.setState({simpleResult: Math.round(Math.min(Math.max(body.comparative / 0.20, -1), 1) * 100)});
    });
  }

  getColour() {
    if(this.state.simpleResult > 20) {
      return 'success';
    }
    if(this.state.simpleResult < -20) {
      return 'danger';
    }
    return 'warning';
  }

  render() {
    return (
      <div className="App">
        <h1>Twitter Sentiment Analysis</h1>
        <Container>
          <Row>
            <Col lg={3} sm={0}></Col>
            <Col lg={6} sm={12}>
              <p>Enter a term to determine whether the sentiment towards it is either positive or negative.</p>

              <Form onSubmit={this.handleSubmit}>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Enter a search term"
                    aria-label="Enter a search term"
                    aria-describedby="basic-addon2"
                    value={this.state.search}
                    onChange={this.handleChange}
                  />
                  <InputGroup.Append>
                    <Button variant="outline-primary" onClick={this.handleSubmit} disabled={this.searchisEmpty()}>Go!</Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form>

              <ProgressBar
                variant={this.getColour()}
                now={this.state.simpleResult * 0.5 + 50}
                label={`${this.state.simpleResult}%`} />
            </Col>
            <Col md={3} sm={0}></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
