import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './components/shared/auth/ProtectedAuth';
import './App.css';
import RentalListing from './components/rental/rental-listing/RentalListing';
import { RentalDetail } from './components/rental';
import { RentalCreate } from './components/rental/rental-create/RentalCreate';
import RentalManage from './components/rental/rental-manage/RentalManage';
import RentalSearchListing from './components/rental/rental-listing/RentalSearchListing';
import BookingManage from './components/booking/booking-manage/BookingManage';
import Header from './components/shared/Header';
import { Provider } from 'react-redux';
import { Init } from './reducers';
import Login from './components/login/Login';
import Register from './components/register/Register';
import * as actions from './actions';

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
              <ProtectedRoute exact path='/rentals/manage' component={RentalManage} />
              <ProtectedRoute exact path='/bookings/manage' component={BookingManage} />
              <ProtectedRoute exact path='/rentals/new' component={RentalCreate} />
              <Route exact path={'/login'} component={Login}></Route>
              <Route exact path={'/register'} component={Register}></Route>
              <Route exact={true} path={"/rental/:id"} component={RentalDetail} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
