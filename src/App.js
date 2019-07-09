import React, { Component } from 'react';
import './App.css';
import { createStore,compose,applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { createLogger } from "redux-logger";
import allReducers from "./reducers/index";
import WeatherDataContainer from "./container/WeatherDataContainer";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = createLogger({
  collapsed: true,
});
const store = createStore(allReducers,
  composeEnhancers(applyMiddleware(thunk, logger))
  );
  store.subscribe(() => store.getState())

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store = {store}>
        <WeatherDataContainer />
        </Provider>
      </div>
    );
  }
}

export default App;
