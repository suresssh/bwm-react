import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import './App.css';
import { RentalList, RentalDetail } from './components/rental'
import Header from './shared/Header'
import { Provider } from 'react-redux'
import { Init } from './reducers'
const store = Init();

class App extends Component {

  constructor() {
    super();
    this.state = {
    }
  }
  
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header></Header>
            <div className='container'>
              <Route exact path="/" render={() => (<Redirect to='/rentals' />)} />
              <Route exact path="/rentals" component={RentalList} />
              <Route exact path="/rental/:id" component={RentalDetail} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
