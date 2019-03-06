import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './components/shared/auth/ProtectedAuth';
import './App.css';
import RentalListing from './components/rental/rental-listing/RentalListing';
import {RentalDetail} from './components/rental';
import { RentalCreate } from './components/rental/rental-create/RentalCreate';
import RentalSearchListing from './components/rental/rental-listing/RentalSearchListing';
import Header from './components/shared/Header';
import { Provider } from 'react-redux';
import { Init } from './reducers';
import Login from './components/login/Login';
import Register from './components/register/Register';
import * as actions from './actions'
const store = Init();

class App extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header logout={this.logout} />
            <div className='container'>
              <Route exact={true} path={'/'} render={() => <Redirect to='/rentals' />} />
              <Route exact path='/rentals' component={RentalListing} />
              <Route exact path='/rentals/:city/homes' component={RentalSearchListing} />
              <Route exact path={'/login'} component={Login}></Route>
              <Route exact path={'/register'} component={Register}></Route>
              <ProtectedRoute exact={true} path={"/rental/:id"} component={RentalDetail} />
              <ProtectedRoute exact path='/rentals/new' component={RentalCreate} />

            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
