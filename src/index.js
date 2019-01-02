'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { signIn } from './libs/requests/signin';
import { hasStringLongerThan } from './libs/helper';

class ExampleSignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            login: '',
            password: '',
            errorMessage: '',
            isAuthorised: false
        };

        ['changeInput', 'logIn', 'logOut', 'processResponse'].forEach((eventName) => {
            this[eventName] = this[eventName].bind(this);
        });
    }

    hasValid() {
        const passwordLength = 6;
        var { password } = this.state;
        var errorMessage = '';

        if (!hasStringLongerThan(passwordLength, password)) {
            errorMessage = 'Password must be longer than 6 letters';
        }

        this.setState({ errorMessage });
        return Boolean(!errorMessage);
    }

    logIn() {
        var {
            state: {
                login,
                password
            }
        } = this;


        signIn({ login, password }).then(this.processResponse);
    }

    logOut() {
        this.setState({ isAuthorised: false });
    }

    processResponse({ response }) {
        if ('error' in response) {
            var {
                error: {
                    description: errorMessage
                }
            } = response;
            this.setState({ errorMessage });
        } else {
            this.setState({
                isAuthorised: Boolean(response.token)
            });
        }
    }

    changeInput({ target: { name, value }}) {
        this.setState({ [name]: value });
    }

    render() {
        var {
            state: {
                login,
                password,
                errorMessage,
                isAuthorised
            }
        } = this;

        return (
            <div>
                {   isAuthorised
                    ?
                        <div className="authorised-box">
                            You are authorised.
                            <button onClick={this.logOut}>Log out</button>
                        </div>
                    :
                        <div className="signin">
                            <h2>Вход</h2>
                            <div className="error-message-box">{errorMessage}</div>
                            <div className="signin-box">
                                <div className="login">
                                    <label htmlFor="signin-login">E-mail:</label>
                                    <input placeholder="example@example.com" id="signin-login" name="login" value={login} onChange={this.changeInput}/>
                                </div>
                                <div className="password">
                                    <label htmlFor="signin-password">Password:</label>
                                    <input name="password" type="password" id="signin-password" value={password} onChange={this.changeInput}/>
                                </div>
                                <button onClick={() => this.hasValid() && this.logIn()}>Sign in</button>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

ReactDOM.render(
    <ExampleSignIn />,
    document.getElementById('example-react')
);
