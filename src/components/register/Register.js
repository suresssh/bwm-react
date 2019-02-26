import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import { register } from '../../actions';
import { Redirect } from 'react-router-dom';
import registerImage from '../../img/register-image.jpg'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            errors: [],
            redirect: false
        };
        this.registerUser = this.registerUser.bind(this);

    }

    registerUser(userData) {
        register(userData).then(
            registered => this.setState({ redirect: true }),
            errors =>this.setState({ errors })

        );
    }

    render() {

        const { errors, redirect } = this.state;

        if (redirect) {
            return <Redirect to={{ pathname: '/login', state: { successRegister: true } }} />
        }
        return (
            <section id='register'>
                <div className='bwm-form'>
                    <div className='row'>
                        <div className='col-md-5'>
                            <h1>Register</h1>
                            <RegisterForm submitCb={this.registerUser} errors={errors} />
                        </div>
                        <div className='col-md-6 ml-auto'>
                            <div className='image-container'>
                                <h2 className='catchphrase'>As our member you have access to most awesome places in the world.</h2>
                                <img src={registerImage} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>)
    }
}

export default connect()(Register);
