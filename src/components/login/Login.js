import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { login } from '../../actions/index';
import { Redirect } from 'react-router-dom';
import LoginImage from '../../img/login-image.jpg'

class Login extends Component {
    constructor() {
        super();
        this.state = {
        }
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser(userData) {
        const { login } = this.props;
        login(userData);
    }

    render() {
        const { isAuth, errors } = this.props.auth;
        const { successRegister } = this.props.location.state || false;

        if (isAuth) {
            return <Redirect to={{ pathname: '/rentals' }} />
        }

        return (
            <section id="login">
                <div className="bwm-form">
                    <div className="row">
                        <div className="col-md-5">
                            <h1>Login</h1>
                            {
                                successRegister &&
                                <div className='alert alert-success'>
                                    <p> You have been succesfuly registered, please login now. </p>
                                </div>
                            }
                            <LoginForm submitCb={this.loginUser} errors={errors} />
                        </div>
                        <div className="col-md-6 ml-auto">
                            <div className="image-container">
                                <h2 className="catchphrase">Hundreds of awesome places in reach of few clicks.</h2>
                                <img src={LoginImage} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

function mapStateToProps(state) {
    console.log(state.auth)
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, { login })(Login)
