import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RentalSearchInput from '../rental/RentalSearchInput';
// import reactLogo from '../../img/react-logo.svg';

class Header extends React.Component {

  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
    this.props.history.push('/rentals');
  }

  renderAuthButtons(isAuth) {
    if (isAuth) {
      return <p className='nav-item nav-link clickable' onClick={this.handleLogout}>Logout</p>
    }

    return (
      <React.Fragment>
        <Link className='nav-item nav-link' to='/login'>Login <span className='sr-only'>(current)</span></Link>
        <Link className='nav-item nav-link' to='/register'>Register</Link>
      </React.Fragment>
    )
  }

  renderOwnerSection(isAuth) {
    if (isAuth) {
      return (
        <div className="nav-item dropdown">
          <p className="nav-link nav-item dropdown-toggle clickable" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Owner Section
          </p>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link className="dropdown-item" to="/rentals/new">Create Rental</Link>
            {/* <Link className="dropdown-item" to="/rentals/manage">Manage Rentals</Link>
            <Link className="dropdown-item" to="/bookings/manage">Manage Bookings</Link> */}
          </div>
        </div>
      )
    }
  }

  render() {
    const { username, isAuth } = this.props.auth;


    return (
      <nav className='navbar navbar-dark navbar-expand-lg'>
        <div className='container'>
          <Link className='navbar-brand' to='/rentals'>BookWithMe
            {/* <img src={reactLogo} alt="" /> */}
          </Link>
          <RentalSearchInput />
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav ml-auto'>
              {isAuth &&
                <p className='nav-item nav-link'>{username}</p>
              }
              {this.renderOwnerSection(isAuth)}
              {this.renderAuthButtons(isAuth)}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default withRouter(connect(mapStateToProps)(Header));
