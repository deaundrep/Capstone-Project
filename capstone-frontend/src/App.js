import React from 'react';
import logo from './logo.svg';
import { Provider } from "react-redux";
import MainRouter from './router/MainRouter';
import  { store } from "./redux-state/redux-store"

// './App.css';

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
      <MainRouter/>
      </Provider>
    </div>
  );
}



export default App;
