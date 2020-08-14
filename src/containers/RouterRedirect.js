import React, { Component } from 'react';
import { Redirect, Route } from "react-router-dom";

class RouterRedirect extends Component {
    render() {
        if (this.props.page == "cards") {
            return <Redirect to="/cards" />
        } else if (this.props.page == "search") {
            return <Redirect to="/search" />
        } else if (this.props.page == "info") {
            return <Redirect to="/info" />
        }
    }
}
export default RouterRedirect;