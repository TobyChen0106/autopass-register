import React, { Component } from 'react';
import './App.css';
import Setting from './containers/Setting';

import { BrowserRouter } from "react-router-dom";
import { positions, Provider } from "react-alert";

const options = {
  timeout: 1500,
  position: positions.MIDDLE
};

const alertStyle = {
  opacity: "0.8",
  backgroundColor: '#000',
  color: 'white',
  wordWrap: "break-word",
  width: '40vw',
  padding: '6vw',
  borderRadius: '6vw',
  display: 'flex',
  flexDirection: "column",
  justifyContent: 'center',
  alignItems: 'center',
}

const addCardTemplate = ({ message, options, style, close }) => {
  return (
    <div style={{ ...alertStyle, ...style }} onClick={close}>
      <span style={{ marginBottom: "2vw" }}>{`成功加入`}</span>
      <span >{message}</span>
    </div>
  )
}

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Provider template={addCardTemplate} {...options}>
          <Setting />
        </Provider>
      </BrowserRouter>
    );
  }
}

