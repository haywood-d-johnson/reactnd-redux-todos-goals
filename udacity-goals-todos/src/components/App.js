import React, { Component } from "react";
import { connect } from "react-redux";

import ConnectedGoals from "./Goals";
import ConnectedTodos from "./Todos";
import { handleInitialData } from "../actions/shared";

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(handleInitialData());
  }

  render() {
    //this is cool
    if (this.props.loading) {
      return <h3>loading...</h3>;
    }

    return (
      <div>
        <ConnectedTodos />
        <ConnectedGoals />
      </div>
    );
  }
}

// also currying; function that calls a function
// data it needs => Component to be rendered
export default connect((state) => ({
  loading: state.loading,
}))(App);
