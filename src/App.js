import React, { Component } from 'react';
import './App.css';
import Setting from './containers/Setting';

import { BrowserRouter } from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 2000,
  position: positions.MIDDLE
};

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Provider template={AlertTemplate} {...options}>
          <Setting />
        </Provider>
      </BrowserRouter>
    );
  }
}

